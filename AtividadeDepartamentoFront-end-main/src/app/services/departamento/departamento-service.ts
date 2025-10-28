import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Departamento} from '../../models/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = 'http://localhost:8080/api/departamentos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }

  listarAtivos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}/ativos`);
  }

  criar(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, departamento);
  }

  atualizar(id: number, departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiUrl}/${id}`, departamento);
  }

  inativar(id: number): Observable<Departamento> {
    return this.http.patch<Departamento>(`${this.apiUrl}/${id}/inativar`, {});
  }
}
