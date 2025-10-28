import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Funcionario} from '../models/Funcionario';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private baseUrl = 'http://localhost:8080/api/funcionarios';

  constructor(private http: HttpClient) {}

  listar(cargo?: string, ativo?: boolean): Observable<Funcionario[]> {
    let params = new HttpParams();
    if (cargo) params = params.set('cargo', cargo);
    if (ativo !== undefined) params = params.set('ativo', ativo);
    return this.http.get<Funcionario[]>(this.baseUrl, { params });
  }

  buscarPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`);
  }

  salvar(funcionario: Funcionario): Observable<Funcionario> {
    if (funcionario.id) {
      return this.http.put<Funcionario>(`${this.baseUrl}/${funcionario.id}`, funcionario);
    } else {
      return this.http.post<Funcionario>(this.baseUrl, funcionario);
    }
  }

  inativar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/inativar`, {});
  }
}
