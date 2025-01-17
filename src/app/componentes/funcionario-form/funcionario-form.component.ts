import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from '../../models/Funcionario';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.css'
})
export class FuncionarioFormComponent implements OnInit{
  @Output() onSubmit = new EventEmitter<Funcionario>();
  @Input() btnAcao!: string;
  @Input() btnTitulo!: string;
  @Input() dadosFuncionario: Funcionario | null = null;

  funcionarioForm!: FormGroup; 

  constructor() {
  }
  ngOnInit(): void {
    this.funcionarioForm = new FormGroup ({
      id: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.id : 0),
      nome: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.nome : '', [Validators.required]),
      escala: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.escala : '',[Validators.required]),
      custoDiario: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.custoDiario : '',[Validators.required]),
      ativo:  new FormControl(this.dadosFuncionario ? this.dadosFuncionario?.ativo : true)
    });

  }

  submit(){
    this.onSubmit.emit(this.funcionarioForm.value);
  }

}
