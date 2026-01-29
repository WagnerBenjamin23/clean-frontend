import { ChangeDetectorRef, Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-category-create-form',
  imports: [ReactiveFormsModule],
  templateUrl: './category-create-form.component.html',
  styleUrl: './category-create-form.component.scss'
})
export class CategoryCreateFormComponent {
  formCategory! : FormGroup; 

  constructor(private categoryService : CategoryService, private fb : FormBuilder,
    private cdr : ChangeDetectorRef
  ){}
  
  ngOnInit(): void {
    this.formCategory = this.fb.group({
      name: [''],
      description: ['']
    })
  }

  saveCategory() {
 
    this.categoryService.saveCategory(this.formCategory.value).subscribe({
      next: response => { this.cdr.detectChanges(); this.formCategory.reset(); },
      error: error => {}
    })
  }


}
