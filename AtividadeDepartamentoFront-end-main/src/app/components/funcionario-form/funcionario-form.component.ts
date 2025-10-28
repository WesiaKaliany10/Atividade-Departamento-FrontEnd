import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoComplete } from 'primeng/autocomplete';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AutoComplete, InputText, Checkbox],
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent implements OnInit {
  formFuncionario: FormGroup;
  departamentos: any[] = [];
  filteredDepartamentos: any[] = [];

  constructor(
    private service: FuncionarioService,
    private route: ActivatedRoute,
    protected router: Router
  ) {
    this.formFuncionario = new FormGroup({
      id: new FormControl(),
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cargo: new FormControl('', Validators.required),
      salario: new FormControl('', [Validators.required, Validators.min(0.01)]),
      dataAdmissao: new FormControl('', Validators.required),
      departamento: new FormControl('', Validators.required),
      ativo: new FormControl(true)
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) this.service.buscarPorId(id).subscribe(f => this.formFuncionario.patchValue(f));

    // Mock de departamentos
    this.departamentos = [
      { id: 1, nome: 'TI' },
      { id: 2, nome: 'RH' },
      { id: 3, nome: 'Financeiro' }
    ];
  }

  filtrarDepartamentos(event: any) {
    const query = event.query.toLowerCase();
    this.filteredDepartamentos = this.departamentos.filter(d =>
      d.nome.toLowerCase().includes(query)
    );
  }

  submit() {
    if (this.formFuncionario.valid) {
      this.service.salvar(this.formFuncionario.value).subscribe(() => {
        alert('Funcionário salvo com sucesso!');
        this.router.navigate(['/']);
      });
    }
  }
}
