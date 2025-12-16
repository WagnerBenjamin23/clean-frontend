import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category/category.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-edit-form',
  templateUrl: './category-edit-form.component.html',
  styleUrls: ['./category-edit-form.component.scss'],
  imports: [CommonModule, MatFormField, ReactiveFormsModule, MatInputModule ]
})
export class CategoryEditFormComponent {
close() {
throw new Error('Method not implemented.');
}

  @Input() category: any;
  @Output() cancel = new EventEmitter<void>();
  @Output() saved = new EventEmitter<any>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService : CategoryService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      idcategory: [this.category.idcategory],
      name: [this.category.name],
      description: [this.category.description]
    });
  }

  save() {
    if (this.form.valid) {
      this.categoryService.updateCategory(this.form.value).subscribe({
        next: (response) => {
       
          this.saved.emit(response);
        },
        error: (error) => {
          console.error('Error updating category', error);
        }
      });

    }
  }
}
