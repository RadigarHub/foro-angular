import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  prueba() {
    return "Hola mundo desde el servicio de Angular";
  }

  register(user): Observable<any> {
    // Convertir el objeto del usuario a un json string
    let params = JSON.stringify(user);

    // Definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Hacer petición AJAX
    return this._http.post(this.url + 'register', params, {headers: headers});
  }
}