import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import {Departamento} from '../../models/Departamento';
import {DepartamentoService} from '../../services/departamento/departamento-service';
import {Toast} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-departamento-list',
  templateUrl: './departamento-list.component.html',
  styleUrl: './departamento-list.component.scss',
  imports: [
    Toast,
    TableModule,
    Tag,
    RouterLink
  ],
  providers: [MessageService]
})
export class DepartamentoListComponent implements OnInit {
  departamentos: Departamento[] = [];
  loading = false;

  constructor(
    private departamentoService: DepartamentoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.carregarDepartamentos();
  }

  carregarDepartamentos(): void {
    this.loading = true;
    this.departamentoService.listarTodos().subscribe({
      next: (dados) => {
        this.departamentos = dados;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar departamentos' });
      }
    });
  }

  inativar(dep: Departamento): void {
    if (!dep.id) return;

    this.departamentoService.inativar(dep.id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Departamento inativado' });
        this.carregarDepartamentos();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao inativar departamento' });
      }
    });
  }
}
