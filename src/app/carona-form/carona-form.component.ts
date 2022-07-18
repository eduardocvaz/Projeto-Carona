import { CaronaService } from './../dashboard/services/carona.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carona } from '../dashboard/model/carona';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ErrorStateMatcher} from "@angular/material/core";
import {Usuario} from "../dashboard/model/usuario";
import {catchError, Observable, of} from "rxjs";
import {UsuarioService} from "../dashboard/services/usuario.service";

@Component({
  selector: 'app-carona-form',
  templateUrl: './carona-form.component.html',
  styleUrls: ['./carona-form.component.css']
})
export class CaronaFormComponent implements OnInit {
  usuarios$: Observable<Usuario[]>;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private caronaService: CaronaService,
    ) {
    this.usuarios$ = this.usuarioService.list().pipe(
      catchError((err) => {
        this._snackBar.open('Erro ao carregar usuários.', 'OK'),
          console.log(err);
        return of([]);
      })
    );
  }

  errorStateMatcher = new ErrorStateMatcher();

  compareFn(x: Usuario, y: Usuario): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  caronaForm!: FormGroup;


  addCarona() {
    if (this.caronaForm.valid) {
      const carona = this.caronaForm.getRawValue() as Carona;
      // carona.usuario = "padrão";
      this.caronaService.post(carona).subscribe({
        complete(): void {
        }, error(err: any): void {
        },
        next: () => {
          this.openSnackBar('Usuário cadastrado com sucesso!', 'OK');
          this.caronaForm.reset();
        }
      });
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.caronaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      local_partida: ['', Validators.required],
      local_destino: ['', Validators.required],
      horario_partida: ['', Validators.required],
      horario_chegada: ['', Validators.required],
      ajudaCombustivel: [''],
      usuario: ['', Validators.required],
    });
  }

}
