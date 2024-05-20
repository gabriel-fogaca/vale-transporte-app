import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from '../../models/Funcionario';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent implements OnInit{
  
  funcionario? :Funcionario;
  id!:number;

  constructor(private funcionarioService : FuncionarioService, private route:ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.funcionarioService.GetGastoTotal(this.id).subscribe((data) => {
      
      this.funcionario = data;

      switch (this.funcionario.escala) {
        case 'CincoxDois':
          this.funcionario.escala = '5x2';
          break;
        case 'SeisxUm':
          this.funcionario.escala = '6x1';
          break;
        case 'SeisxDois':
          this.funcionario.escala = '6x2';
          break;
        case 'DozeTrintaSeis':
          this.funcionario.escala = '12x36';
          break;
        default:
          break;

      }
    });
  }
  InativaFuncionario(){
    this.funcionarioService.InativaFuncionario(this.id).subscribe((data) =>{
      this.router.navigate(['']);
    })
  }
}
