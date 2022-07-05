import { UsuarioService } from './../dashboard/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../dashboard/model/usuario';
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
    private usuarioService: UsuarioService,
    ) { }


  usuarioForm!: FormGroup;


  addUsuario() {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.getRawValue() as Usuario;
      this.usuarioService.post(usuario).subscribe({
        next: () => {
          this.openSnackBar('Usuário cadastrado com sucesso!', 'OK');
          this.usuarioForm.reset();
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
    this.usuarioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

}
