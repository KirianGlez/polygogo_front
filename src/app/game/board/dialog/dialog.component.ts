import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Properties } from '../../properties';
import { GameService } from '../../game.service';
import { PlayerDetails } from '../../PlayerDetails';
export interface DialogData {
  property: Properties;
  playerDetails: PlayerDetails;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent {

  property: Properties= new Properties();
  playerDetails: PlayerDetails = new PlayerDetails();

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private gameService: GameService,) {
      this.property = data.property;
      this.playerDetails = data.playerDetails;
    }

  close(): void {
    this.gameService.pasarTurno(this.playerDetails).subscribe(response=> this.dialogRef.close());
  }

  buy():void {
    this.gameService.buyProperty(this.playerDetails, this.property).subscribe(response=> this.close());
  }

}
