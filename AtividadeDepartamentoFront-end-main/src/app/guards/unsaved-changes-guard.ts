import { CanDeactivateFn } from '@angular/router';
import { FormGroup } from '@angular/forms';

export interface HasUnsavedChanges {
  formFuncionario?: FormGroup;
  formDepartamento?: FormGroup;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
  const form = component.formFuncionario || component.formDepartamento;
  if (form && form.dirty) {
    return confirm('Existem alterações não salvas. Deseja realmente sair?');
  }
  return true;
};
