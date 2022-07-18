import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  private url = 'http://localhost:3000/usuario';

  post(usuario: Usuario) {
    return this.httpClient.post(this.url, usuario)
    .pipe(
      first(),
      tap(() => console.log('Usuário cadastrado com sucesso!')),
      delay(1000)
    );
  }

  list() {
    return this.httpClient.get<Usuario[]>(this.url)
      .pipe(
        first(),
        tap(console.log)
      );
  }
}
