import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-products-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit, OnChanges {
  @Output() filterChange = new EventEmitter<any[]>();
  @Input() products: any[] = [];
  @Input() categories: any[] = [];
  @Input() initialStock: '' | 'inStock' | 'out' = '';

  filterForm!: FormGroup;
  filteredProducts: any[] = [];

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      search: [''],
      category: [''],
      stock: [''],
      minPrice: ['0'],
      maxPrice: ['1000000']
    });

    if (this.initialStock) {
    this.filterForm.patchValue({ stock: this.initialStock });
    this.applyFilter();
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.products || this.products.length === 0) return;

    Promise.resolve().then(() => {
      this.filteredProducts = [...this.products];

      if (this.initialStock) {
      this.filterForm.patchValue({ stock: this.initialStock });
      }

      const maxPrice = Math.max(...this.products.map(p => p.price));
      this.filterForm.patchValue({ maxPrice });

      this.cdr.detectChanges();
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const { search, category, stock, minPrice, maxPrice } = this.filterForm.value;

    let filtered = [...this.products];

    // Filtrar por nombre
    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (category) {
      filtered = filtered.filter(p => p.categories_idcategory === category);
    }

    // Filtrar por stock
    if (stock) {
      filtered = filtered.filter(p =>
        stock === 'inStock' ? p.stock > 0 : p.stock === 0
      );
    }

    // Filtrar por precio
    filtered = filtered.filter(p => p.price >= (minPrice || 0) && p.price <= (maxPrice || Infinity));

    this.filteredProducts = filtered;
    this.filterChange.emit(filtered);
  }

  clearFilters(): void {
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
