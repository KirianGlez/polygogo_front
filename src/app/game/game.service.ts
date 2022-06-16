import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../login/user';
import { Game } from './game';
import { PlayerDetails } from './PlayerDetails';
import { Properties } from './properties';

@Injectable({
  providedIn: 'root'
})
export class GameService {

public game: Game = new Game();

private urlEndPoint: string = environment.urlPublica+'/game'

private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

constructor(private http: HttpClient,
  private router: Router) { }

search(user: User) : Observable<Game>{
  return this.http.post<Game>(this.urlEndPoint + '/search', user, {headers: this.httpHeaders})
}

findById(game: Game) : Observable<Game>{
  return this.http.get<Game>(`${this.urlEndPoint}/${game.id}`);
}

update(game: Game) : Observable<Game>{
  return this.http.put<Game>(`${this.urlEndPoint}/${game.id}`, game, {headers: this.httpHeaders})
}

checkIfPlayerInGame(user: User) : Observable<Game>{
  return this.http.put<Game>(this.urlEndPoint + '/check', user, {headers: this.httpHeaders})
}

movePlayer(playerDetails: PlayerDetails) : Observable<Properties>{
  return this.http.put<Properties>(`${this.urlEndPoint}/move`, playerDetails, {headers: this.httpHeaders})
}

getProperties() : Observable<Properties[]>{
  return this.http.get<Properties[]>(this.urlEndPoint + '/properties', {headers: this.httpHeaders})
}

buyProperty(playerDetails: PlayerDetails, property: Properties) : Observable<PlayerDetails>{
  return this.http.put<PlayerDetails>(`${this.urlEndPoint}/buy/${property.id}`, playerDetails, {headers: this.httpHeaders})
}

pasarTurno(playerDetails: PlayerDetails) : Observable<PlayerDetails>{
  return this.http.put<PlayerDetails>(`${this.urlEndPoint}/pasar`, playerDetails, {headers: this.httpHeaders})
}

setLastResponse(playerDetails: PlayerDetails) : Observable<PlayerDetails>{
  return this.http.put<PlayerDetails>(`${this.urlEndPoint}/lastresponse`, playerDetails, {headers: this.httpHeaders})
}

}
