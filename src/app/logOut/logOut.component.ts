import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logOut',
  templateUrl: './logOut.component.html',
  styleUrls: ['./logOut.component.sass']
})
export class LogOutComponent implements OnInit {

  constructor(private router: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
  }

  public logOut(){
    this.cookieService.delete('username');
    this.cookieService.delete('password');

    this.router.navigate(['/login']);
  }

}
