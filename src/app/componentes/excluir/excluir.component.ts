import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Funcionario } from '../../models/Funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrl: './excluir.component.css'
})
export class ExcluirComponent implements OnInit{

  inputdata: any;
  funcionario!: Funcionario

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private funcionarioService: FuncionarioService, private router: Router, private ref:MatDialogRef<ExcluirComponent>){}


  ngOnInit(): void {
    this.inputdata = this.data;

    this.funcionarioService.GetFuncionario(this.inputdata.id).subscribe((data) => {
      this.funcionario = data;
    });
  }

  Excluir(){
    this.funcionarioService.ExcluirFuncionario(this.inputdata.id).subscribe((data) => {
      this.ref.close();
      window.location.reload();
    });
  }

  Cancelar(){
    this.ref.close();
  }

}
