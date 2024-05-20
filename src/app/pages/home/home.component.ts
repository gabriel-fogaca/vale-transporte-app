import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/Funcionario';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from '../../componentes/excluir/excluir.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  funcionariosGeral: Funcionario[] = [];
  colunas = ['Situação', 'Nome', 'Escala', 'Custo Diário', 'Ações', 'Excluir']

  constructor(private funcionarioService: FuncionarioService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.funcionarioService.GetFuncionarios().subscribe(data => {

      this.funcionarios = data.map(funcionario => {
        return {
          ...funcionario,
          escala: this.mapearEscala(funcionario.escala)
        } as Funcionario;
      });

      this.funcionariosGeral = this.funcionarios;
    });
  }

  mapearEscala(escala: string): string {
    switch (escala) {
      case 'CincoxDois':
        return '5x2';
      case 'SeisxUm':
        return '6x1';
      case 'SeisxDois':
        return '6x2';
      case 'DozeTrintaSeis':
        return '12x36';
      default:
        return escala;
    }
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.funcionarios = this.funcionariosGeral.filter(funcionario => {
      return funcionario.nome.toLowerCase().includes(value);
    });
  }

  openDialog(id: number){
    this.dialog.open(ExcluirComponent, {
      width: '450px',
      height: '450px',
      data: {
        id: id
      }
    });
  }
}
