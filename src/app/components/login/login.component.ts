import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public identity: Object;
  public token: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identifícate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    // Conseguir el objeto completo de usuario logueado
    this._userService.signup(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          // Guardamos el usuario en una propiedad y en el localStorage del navegador web
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          // Conseguir el token del usuario identificado
          this._userService.signup(this.user, true).subscribe(
            response => {
              if (response.token) {
                // Guardamos el token en una propiedad y en el localStorage del navegador web
                this.token = response.token;
                localStorage.setItem('token', this.token);
                this.status = 'success';

                // Redirigimos a la página de inicio
                this._router.navigate(['/inicio']);

              } else {
                this.status = 'error';
              }
            },
            error => {
              this.status = 'error';
              console.log(error);
            }
          );
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
