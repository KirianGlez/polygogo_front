import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../login/user';
import { Game } from './game';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
  providers: [CookieService]
})
export class GameComponent implements OnInit {
  public user: User = new User();
  public game: Game = new Game();

  constructor(private router: Router,
    private cookieService: CookieService,
    private gameService: GameService) { }

  ngOnInit() {
    if(!this.cookieService.get('username')){
      this.router.navigate(['/login']);
    }else{
      this.user.username = this.cookieService.get('username');
      this.user.password = this.cookieService.get('password');
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
            this.searchGame();
          }
        }
      )
    }
  }

  private searchGame(){
    this.gameService.search(this.user).subscribe(
      response => {
        this.game=response;
        console.log(this.game.id);
        this.waitForGame();
      }
    )
  }

  private async waitForGame(){
      this.gameService.findById(this.game).subscribe(
        async response => {
          this.game = response;
          if(this.game.players_details.length<4){
            console.log("no hay jugador 4");
            await this.delay(5000);
            this.waitForGame();
          }else{
            console.log("entrando en partida");
            this.router.navigate(['/board']);
          }
        }
      )
      
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
