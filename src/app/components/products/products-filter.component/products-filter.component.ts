import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from "@angular/material/select";
import { CategoryService } from '../../../services/category/category.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-products-filter',
  imports: [CommonModule, FormsModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatButtonModule],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.scss'
})
export class ProductsFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<any[]>();
  @Input() products: any[] = [];
  @Input() categories: any[] = [];
  filteredProducts: any[] = [...this.products];
  filterForm!: FormGroup;
 
  constructor(private fb : FormBuilder, private categoryService : CategoryService, private cdr: ChangeDetectorRef){
    
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      search:[''],
      category:[''],
      stock:[''],
      minPrice:['0'],
      maxPrice:['1000000']
    })   
    
  }

  ngOnChanges() {
    if (!this.products || this.products.length === 0) {
    return; // 🔹 Nada que hacer hasta que lleguen los productos
    }
    

  // 🔹 Esperamos al siguiente ciclo de detección
    Promise.resolve().then(() => {
    this.filteredProducts = [...this.products];
    let maxPrice = this.filterForm.get("maxPrice")?.value;
    maxPrice = Math.max(...this.products.map(p => p.price));
    this.filterForm.patchValue({ price: maxPrice });

      this.cdr.detectChanges();
      this.applyFilter();
    });
  }

  applyFilter() {
    const { search, category, stock, minPrice, maxPrice } = this.filterForm.value;

    let filtered = [...this.products];

    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(p => p.categories_idcategory === category);
    }

    if (stock) {
      filtered = filtered.filter(p =>
        stock === 'inStock' ? p.stock > 0 : p.stock === 0
      );
    }

    filtered = filtered.filter(p => p.price >= (minPrice || 0) && p.price <= (maxPrice || Infinity));


    this.filterChange.emit(filtered);
  }

  clearFilters(){
  
    this.filterForm.reset({
      search: '',
      category: '',
      stock: '',
      minPrice: 0,
      maxPrice: Math.max(...this.products.map(p => p.price))
    });

    this.applyFilter();
  }

}
