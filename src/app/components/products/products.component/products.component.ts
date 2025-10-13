import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductItemComponent } from '../product-item.component/product-item.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';
import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormsModule } from "@angular/forms";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ProductCreateFormComponent } from "../product-create-form.component/product-create-form.component";
import { ProductsFilterComponent } from "../products-filter.component/products-filter.component";
import { CategoryService } from '../../../services/category/category.service';

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule, ProductItemComponent, ProductsFilterComponent, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
    MatSelectModule, MatMenuModule, MatIconModule, MatDividerModule, MatButtonModule, ProductCreateFormComponent, ProductsFilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

paginatedProducts : any[] = [];
productsLoaded: any;
index: any;
totalPages: number = 1;
currentPage: number = 0;
pageSize: number = 10;
editingProductId: number | null = null;
editForm!: FormGroup;
selectedProduct : any = '';
filteredProducts : any[] = [];
categories: any[]= [];

constructor(private productsService : ProductService, private cdr: ChangeDetectorRef, private fb : FormBuilder, private categoryService : CategoryService) {}

ngOnInit(): void {
  this.getAllCategories()
    this.loadProducts();
}

trackById(index: number, product: any) {
  return product.idproducts; // o cualquier identificador único
}

getAllCategories(){
    this.categoryService.getCategories().subscribe({
      next: (data : any) => {
        this.categories = data.categories;
      },
      error: (e) => {
        console.error("Categorias no disponiles")
      }
    })
  }


loadProducts() {  
this.productsService.getProducts().subscribe({
  next: (data: any) => {
    this.productsLoaded = data.products.map((p: any) => ({
        ...p,
        isEditing: false
      }));

    this.filteredProducts = this.productsLoaded;
    this.totalPages = Math.ceil(this.filteredProducts.length  / this.pageSize);
      console.log(this.productsLoaded)
    this.currentPage = 0;
    this.updatePaginatedProducts();
    this.cdr.detectChanges();
  }
})
}

onProductsFiltered(filtered: any[]) {
    this.filteredProducts = filtered;
    this.updatePaginatedProducts();
    console.log('FILTRADOS', this.filteredProducts)
  }

onVisibilityChange(event: {id:number, visible:boolean}) {
  const product = this.paginatedProducts.find((p:any) => p.idproducts === event.id);
  if (product) product.is_active = event.visible ? 0 : 1;
  
  this.productsService.changeProductVisibility(event.id, event.visible ? 0 : 1).subscribe({
    next: (data:any) => {
      console.log('Product visibility changed', data);
    },
    error: (error:any) => {
      console.error('Error changing product visibility', error);
      if (product) product.is_active = !event.visible;
    }
    
  })
}


 updatePaginatedProducts() {
  
     const start = this.currentPage * this.pageSize;
     this.paginatedProducts = [...this.filteredProducts.slice(start, start + this.pageSize)];
  }

  nextPage() {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }


editProduct(_t13: any) {
throw new Error('Method not implemented.');
}

onDelete(event: {id:number}){

    // 1. saco el producto de la lista principal
  this.productsLoaded = this.productsLoaded.filter((p: any) => p.idproducts !== event.id);

  // 2. recalculo total de páginas
  this.totalPages = Math.ceil(this.productsLoaded.length / this.pageSize);

  // 3. si estoy en una página mayor al total, retrocedo
  if (this.currentPage >= this.totalPages) {
    this.currentPage = Math.max(this.totalPages - 1, 0);
  }

  // 4. vuelvo a armar la lista de productos visibles
  this.updatePaginatedProducts();

  // 5. fuerza renderizado
  this.cdr.detectChanges();

  console.log('Productos después de borrar', this.paginatedProducts);
}


onEditing(event: { id: number; isEditing: boolean }) {

  if (this.selectedProduct && this.selectedProduct.idproducts === event.id) {
    this.selectedProduct = null;
    return;
  }
  
    this.selectedProduct = this.productsLoaded.find((p: any) => p.idproducts === event.id);
   console.log('seleccionado', this.selectedProduct)

    if (this.selectedProduct) {
      this.editForm = this.fb.group({
        name: [this.selectedProduct.name, Validators.required],
        price: [this.selectedProduct.price, Validators.required],
        stock: [this.selectedProduct.stock, Validators.required]
      });
    }
  
  
    console.log(event)
}


}
