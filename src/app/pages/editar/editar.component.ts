import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../models/Funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{

  btnAcao: string = 'Editar!';
  btnTitulo: string = 'Editar Funcionário';

  id!: number;
  funcionario!: Funcionario;

  constructor(private funcionarioService : FuncionarioService, private router :Router,  private route : ActivatedRoute) {


  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.funcionarioService.GetGastoTotal(this.id).subscribe((data : Funcionario) => {
        this.funcionario = data;
    });
  }

  async editFuncionario(funcionarioEditado: Funcionario) {
    this.funcionarioService.EditFuncionario(funcionarioEditado).subscribe((data) => {
      this.router.navigate(['/'])
    })
  }   

}
