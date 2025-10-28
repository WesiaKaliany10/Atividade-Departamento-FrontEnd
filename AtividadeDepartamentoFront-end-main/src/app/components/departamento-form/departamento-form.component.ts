import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MessageService } from 'primeng/api';
import {DepartamentoService} from '../../services/departamento/departamento-service';
import {Departamento} from '../../models/Departamento';
import {Toast} from 'primeng/toast';


@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html',
  imports: [
    Toast,
    ReactiveFormsModule
  ],
  styleUrl: './departamento-form.component.scss',
  providers: [MessageService]
})
export class DepartamentoFormComponent implements OnInit {
  form!: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private service: DepartamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sigla: ['', Validators.required]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.service.listarTodos().subscribe(deps => {
        const dep = deps.find(d => d.id === this.id);
        if (dep) this.form.patchValue(dep);
      });
    }
  }

  salvar(): void {
    const dep: Departamento = this.form.value;

    if (this.id) {
      this.service.atualizar(this.id, dep).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Atualizado', detail: 'Departamento atualizado' });
          this.router.navigate(['/departamentos']);
        },
        error: (err) => this.handleError(err)
      });
    } else {
      this.service.criar(dep).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Criado', detail: 'Departamento criado' });
          this.router.navigate(['/departamentos']);
        },
        error: (err) => this.handleError(err)
      });
    }
  }

  private handleError(err: any) {
    const msg = err?.error?.message || 'Erro ao salvar departamento';
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg });
  }
}
