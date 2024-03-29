import { UsuarioService } from './../dashboard/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../dashboard/model/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

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
        complete(): void {
        }, error(err: any): void {
        },
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
