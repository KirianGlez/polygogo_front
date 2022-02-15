import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LobbyComponent } from './lobby/lobby.component';
import { GameComponent } from './game/game.component';
import { BoardComponent} from './game/board/board.component';
import { LogOutComponent } from './logOut/logOut.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './game/board/dialog/dialog.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'lobby', component: LobbyComponent},
  {path: 'game', component: GameComponent},
  {path: 'board', component: BoardComponent}
]

@NgModule({
  declarations: [					
    AppComponent,
      LoginComponent,
      LobbyComponent,
      GameComponent,
      BoardComponent,
      LogOutComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
