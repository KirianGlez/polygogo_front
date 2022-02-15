import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from './user';
import { CookieService } from 'ngx-cookie-service';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public user: User = new User();

  public titulo: String = "Login";

  constructor(private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService,
    private gameService: GameService) { }

  ngOnInit() {
    if(this.cookieService.get('username') && this.cookieService.get('password')){
      this.user.username=this.cookieService.get('username');
      this.user.password=this.cookieService.get('password');
      this.loginService.logIn(this.user).subscribe(
        response => {
          console.log("Logueado usuario: " + this.user.username);
          this.cookieService.set('username', this.user.username.valueOf());
          this.cookieService.set('password', this.user.password.valueOf());
          this.gameService.checkIfPlayerInGame(this.user).subscribe(
            response=> {
              if(response){
                this.gameService.game = response;
                if(response.players_details.length<4){
                  this.router.navigate(['/game']);
                }else{
                  this.router.navigate(['/board']);
                }
              }else{
                this.router.navigate(['/lobby']);
              }
            }
          )
        }
      )
    }
  }

  onSubmit(buttonType: String){
    if(buttonType == "SignIn"){
      this.loginService.create(this.user).subscribe(
        response => console.log("Registrado usuario: " + this.user.username)
        //response => this.router.navigate(['/login'])
      )
    }else{
      this.loginService.logIn(this.user).subscribe(
        response => {
          console.log("Logueado usuario: " + this.user.username);
          this.cookieService.set('username', this.user.username.valueOf());
          this.cookieService.set('password', this.user.password.valueOf());
          this.router.navigate(['/lobby']);
        }
      )
    }
  }


}
