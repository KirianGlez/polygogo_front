import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GameService } from '../game/game.service';
import { LoginService } from '../login/login.service';
import { User } from '../login/user';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.sass'],
  providers: [CookieService]
})
export class LobbyComponent implements OnInit {
  public user: User = new User();

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
        },
        error => {
          console.log("Usuario no registrado");
          this.router.navigate(['/login']);
        }
      );
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
      );
    }else{
      this.router.navigate(['/login']);
    }
  }

  

}
