import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/Funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private apiUrl = `${environment.ApiUrl}/funcionarios`
  private apiUrl2 = `${environment.ApiUrl}/gastos-mensais`

  constructor( private http: HttpClient  ) { }

  GetFuncionarios() : Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  GetFuncionario(id: number) : Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
  }

  GetGastoTotal(id: number) : Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl2}/${id}`);
  }

  CreateFuncionario(funcionario : Funcionario) : Observable<Funcionario[]>{
    return this.http.post<Funcionario[]>(`${this.apiUrl}`, funcionario)
  }

  EditFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    const id = Number(funcionario.id);
    return this.http.put<Funcionario>(`${this.apiUrl}/${id}`, funcionario);
  }

  InativaFuncionario(id:number) : Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/${id}/inativar`, id);
  }

  ExcluirFuncionario(id: number) : Observable<Funcionario>{
    return this.http.delete<Funcionario>(`${this.apiUrl}/${id}`)
  }
}
