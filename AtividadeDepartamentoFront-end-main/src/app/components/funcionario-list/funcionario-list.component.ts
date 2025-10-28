import {Component, OnInit} from '@angular/core';
import {FuncionarioService} from '../../services/funcionario-service';
import {TableModule} from 'primeng/table';
import { Router } from '@angular/router';
import {Funcionario} from '../../models/Funcionario';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe, DatePipe, NgClass} from '@angular/common';


@Component({
  selector: 'app-funcionario-list',
  imports: [
    TableModule,
    FormsModule,
    NgClass,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.scss'
})
export class FuncionarioListComponent implements OnInit{
  funcionarios: Funcionario[] = [];
  cargos: string[] = [];
  filtroCargo?: string;
  filtroAtivo?: boolean;

  constructor(private service: FuncionarioService, protected router: Router) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.service.listar(this.filtroCargo, this.filtroAtivo).subscribe(data => {
      this.funcionarios = data;
      this.cargos = Array.from(new Set(data.map(f => f.cargo)));
    });
  }

  inativar(funcionario: Funcionario) {
    if (confirm(`Deseja inativar ${funcionario.nome}?`)) {
      this.service.inativar(funcionario.id!).subscribe(() => this.carregarFuncionarios());
    }
  }
}
