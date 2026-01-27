import { ChangeDetectorRef, Component } from '@angular/core';
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CategoryCreateFormComponent } from "../category-create-form.component/category-create-form.component";
import { CategoryService } from '../../services/category/category.service';
import { CategoryEditFormComponent } from "../category-edit-form.component/category-edit-form.component";

@Component({
  standalone: true,
  selector: 'app-categories.component',
  imports: [MatCard, MatCardModule, MatIconModule, CategoryCreateFormComponent, CategoryEditFormComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  selectedCategory: any = null;
  categories: any = [];

  constructor(private categoryService : CategoryService, private cdr : ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadCategories();
  } 

  deleteCategory(id : number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response: any) => {console.log(response)
        this.cdr.detectChanges();
      },
      error: (error: any) => console.log(error),
      complete: () => this.loadCategories()
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data.categories ?? data;
        console.log(this.categories);
        this.cdr.detectChanges();

      },
      error: error => console.log(error)
    })
  }

    editCategory(category: any) {

    this.selectedCategory = { ...category };
  }

    cancelEdit() {
      this.selectedCategory = null;
    }

    updateCategory(updated: any) {
    const idx = this.categories.findIndex((c: { idcategory: any; }) => c.idcategory === updated.idcategory);
    if (idx !== -1) {
      this.categories[idx] = updated;
    }
    this.selectedCategory = null;
  }

}
