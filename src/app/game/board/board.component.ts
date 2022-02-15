import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/login/user';
import { Game } from '../game';
import { GameService } from '../game.service';
import { PlayerDetails } from '../PlayerDetails';
import { Properties } from '../properties';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass','./box.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {

  properties: Properties[] = [];
  game: Game=new Game();
  user: User=new User();
  playerDetails: PlayerDetails= new PlayerDetails();

  constructor(private router: Router,
    private cookieService: CookieService,
    private gameService: GameService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.gameService.getProperties().subscribe(response=> {this.properties = response.sort((a, b) => (a.id > b.id) ? 1 : -1);});
    this.game = this.gameService.game;
    if(!this.cookieService.get('username')){
      this.router.navigate(['/login']);
    }else{
      this.user.username = this.cookieService.get('username');
      this.user.password = this.cookieService.get('password');
      this.gameService.checkIfPlayerInGame(this.user).subscribe(
        response=> {
          if(response){
            this.gameService.game = response;
            this.game = this.gameService.game;
            this.mostrarDatosPartida();
          }else{
            this.router.navigate(['/lobby']);
          }
        }
      )
    }
  }

  private async mostrarDatosPartida(){
    this.gameService.findById(this.game).subscribe(
      async response => {
        this.game=response
        this.game.players_details = this.game.players_details.sort((a, b) => (a.player_number > b.player_number) ? 1 : -1);
        this.game.players_details.forEach(player => {
          if(player.user_id == this.user.username){
            this.playerDetails = player;
          }

          if(player.turn){
            let turno=document.getElementById('turno') as HTMLInputElement;
            turno.innerHTML = "Turno de " + player.user_id;
          }
        });
      console.log("delay");
      this.mostrarPosiciones();
      await this.delay(1000);
      this.mostrarDatosPartida();
      });
  }

  private mostrarPosiciones(){
    for(let i = 0; i <=27; i++){
      let box=document.getElementById('ficha'+i) as HTMLInputElement;
      box.innerHTML = "";
    }
    this.game.players_details.forEach(
      player_details => {
        let box=document.getElementById('ficha' + player_details.position) as HTMLInputElement;
        box.innerHTML += '<div id="token'+player_details.player_number+'"></div>';
      }
    )
  }

  public tirarDados(){
    this.playerDetails.turn = false;
    let dados=document.getElementById('dado') as HTMLInputElement;
    dados.style.display = "inline";
    this.gameService.movePlayer(this.playerDetails).subscribe(
      response => {
        dados.innerHTML = "";
        this.openDialog(response);
      }
    )
  }

  openDialog(property: Properties) {
    this.dialog.open(DialogComponent, {
      data: {
        property: property,
        playerDetails: this.playerDetails
      },
      width: '60%',
      height: '80%'
    });
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}