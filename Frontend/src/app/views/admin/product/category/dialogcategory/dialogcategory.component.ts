import { Component, Inject } from '@angular/core';

import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiProductService } from '@services/apiproduct.service';
import { Category } from '@models/category';

@Component({
  selector: 'app-dialogcategory',
  templateUrl: './dialogcategory.component.html',
  styleUrls: ['./dialogcategory.component.scss'],
})
export class DialogCategoryComponent {
  constructor(
    private _apiProduct: ApiProductService,
    private _dialogRef: MatDialogRef<DialogCategoryComponent>,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public category: Category
  ) {
    if (this.category !== null) {
      const setCategory = {
        id: category.id,
        categoriaGeneral: category.categoriaGeneral,
        categoriaEspecifica: category.categoriaEspecifica,
      };
      this.formCategory.setValue(setCategory);
    }
  }

  formCategory = this._fb.group({
    id: 0,
    categoriaGeneral: ['', Validators.required],
    categoriaEspecifica: [
      '',
      {
        validators: [Validators.required, Validators.maxLength(30)],
        asyncValidators: [this.singleName()],
      },
    ],
  });

  close() {
    this._dialogRef.close();
  }

  add(category: Category) {
    if (this.formCategory.valid) {
      this._apiProduct.addCategory(category).subscribe((response) => {
        if (response.exito === 1) {
          this._dialogRef.close();
          this._snackBar.open('Categoría insertada con éxito', '', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        } else {
          this._snackBar.open('Error => ' + response.message, '', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        }
      });
    }
  }

  edit(category: Category) {
    if (this.formCategory.valid) {
      this._apiProduct.editCategory(category).subscribe((response) => {
        if (response.exito === 1) {
          this._dialogRef.close();
          this._snackBar.open('Categoría editada con éxito', '', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        }
      });
    }
  }

  //#region AsyncValidators
  singleName(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
      const id = this.formCategory.controls.id.value;
      const name = control.value;

      return this._apiProduct.findCategory(name).pipe(
        map((res) => {
          if (res.data) {
            let idPv: number = res.data[0].id;
            let estado: number = res.data[0].idEstadoCategoria;

            if (!id && res.exito === 1 && estado !== 3)
              return { singleName: true };

            if (id !== idPv && res.exito === 1 && estado !== 3)
              return { singleName: true };
          }
        })
      );
    };
  }
  //#endregion

  //#region Get Fb
  formValue(value: string) {
    return this.formCategory.get(value);
  }
  //#endregion
}
