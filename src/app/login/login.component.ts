import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { GeneralConstants } from '../constantes/genealConstantes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private sharedService: SharedService
  ) { }
  /** 
   * Aqui validamos que ninguno de los campos del login no esten vacios
   * Si ninguno de los dos esta vacio nos redirreciona con un navugate al home 
   * **/
  signIn() {
    if (this.email.trim() !== '' && this.password.trim() !== '') {
      this.router.navigate(['/home']);
      console.log('Inicio de sesión exitoso');
    } else {
      console.log('Por favor, ingrese su correo electrónico y contraseña.');
    }
  }

}