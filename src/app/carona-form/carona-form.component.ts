import { CaronaService } from './../dashboard/services/carona.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carona } from '../dashboard/model/carona';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-carona-form',
  templateUrl: './carona-form.component.html',
  styleUrls: ['./carona-form.component.css']
})
export class CaronaFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private caronaService: CaronaService,
    ) { }


  caronaForm!: FormGroup;


  addCarona() {
    if (this.caronaForm.valid) {
      const carona = this.caronaForm.getRawValue() as Carona;
      carona.usuario = "padrão";
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
      localPartida: ['', Validators.required],
      localDestino: ['', Validators.required],
      horarioPartida: ['', Validators.required],
      horarioChegada: ['', Validators.required],
      isAjuda: ['', Validators.required]
    });
  }

}
