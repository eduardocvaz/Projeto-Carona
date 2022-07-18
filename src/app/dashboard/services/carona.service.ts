import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carona } from '../model/carona';
import { delay, first, tap } from 'rxjs';
import {Usuario} from "../model/usuario";

@Injectable({
  providedIn: 'root'
})
export class CaronaService {

  constructor(private httpClient: HttpClient) { }

  private url = 'http://localhost:3000/caronas';

  post(carona: Carona) {
    return this.httpClient.post(this.url, carona)
      .pipe(
        first(),
        tap(() => console.log('Carona cadastrado com sucesso!')),
        delay(1000)
      );
  }

  list() {
    return this.httpClient.get<Carona[]>(this.url)
      .pipe(
        first(),
        tap(console.log)
      );
  }
}
