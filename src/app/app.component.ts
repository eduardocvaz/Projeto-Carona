import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddDialogComponent} from './add-dialog/add-dialog.component';
import {catchError, Observable, of} from "rxjs";
import {Usuario} from "./dashboard/model/usuario";
import {Carona} from "./dashboard/model/carona";
import {UsuarioService} from "./dashboard/services/usuario.service";
import {CaronaService} from "./dashboard/services/carona.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projeto-Carona';


  displayedColumnss: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  displayedColumns: string[] = [
    'id',
    'titulo',
    'local_partida',
    'local_destino',
    'horario_partida',
    'horario_chegada',
    'ajudaCombustivel',
    'usuarioNome',
    'usuarioTelefone'
  ];
  caronas$: Observable<Carona[]>;
  myCaronas: Carona[] = [];
  dataSource: MatTableDataSource<Carona>;

  constructor(
    private dialog: MatDialog,
    private caronaService: CaronaService,
    private _snackBar: MatSnackBar,
  ) {
    this.caronas$ = this.caronaService.list().pipe(
      catchError((err) => {
        this._snackBar.open('Erro ao carregar caronas.', 'OK'),
          console.log(err);
        return of([]);
      })
    );

    this.caronas$.subscribe(caronas => {
      this.myCaronas = caronas;
      this.dataSource = new MatTableDataSource(this.myCaronas);
    });
    this.dataSource = new MatTableDataSource(this.myCaronas);
  }


  openDialog(element: any) {
    this.dialog.open(AddDialogComponent, {
      data: element
    });
    this.dialog.afterAllClosed.subscribe(() => {
      window.location.reload();
    });
  }
}
