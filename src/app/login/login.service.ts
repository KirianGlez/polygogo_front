import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

public user: User = new User();

private urlEndPoint: string = environment.urlPublica+'/login'

private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

constructor(private http: HttpClient) { }

create(user: User) : Observable<User>{
  return this.http.post<User>(this.urlEndPoint, user, {headers: this.httpHeaders})
}

logIn(user: User) : Observable<User>{
  return this.http.get<User>(`${this.urlEndPoint}/${user.username}+${user.password}`)
}
  
}
