import { Component } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-create-form',
  imports: [ReactiveFormsModule],
  templateUrl: './category-create-form.component.html',
  styleUrl: './category-create-form.component.scss'
})
export class CategoryCreateFormComponent {
  formCategory! : FormGroup; 

  constructor(private categoryService : CategoryService, private fb : FormBuilder){}
  
  ngOnInit(): void {
    this.formCategory = this.fb.group({
      name: [''],
      description: ['']
    })
  }

  saveCategory() {
 
    this.categoryService.saveCategory(this.formCategory.value).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }


}
