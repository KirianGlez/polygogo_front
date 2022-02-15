import { Component } from '@angular/core';
import { User } from './login/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'polygogo';
  descripcion = 'Tu juego';
}
