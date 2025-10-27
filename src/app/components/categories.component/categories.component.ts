import { ChangeDetectorRef, Component } from '@angular/core';
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CategoryCreateFormComponent } from "../category-create-form.component/category-create-form.component";
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-categories.component',
  imports: [MatCard, MatCardModule, MatIconModule, CategoryCreateFormComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  categories: any = [];

  constructor(private categoryService : CategoryService, private cdr : ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadCategories();
  } 

  deleteCategory(id : number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
      complete: () => this.loadCategories()
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data.categories ?? data;
        console.log('cate cargadas', this.categories);
        this.cdr.detectChanges();
      },
      error: error => console.log(error)
    })
  }

}
