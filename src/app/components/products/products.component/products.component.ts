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
import { ProductEditFormComponent } from "../product-edit-form.component/product-edit-form.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule, ProductItemComponent, ProductsFilterComponent, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
    MatSelectModule, MatMenuModule, MatIconModule, MatDividerModule, MatButtonModule, ProductCreateFormComponent, ProductsFilterComponent, ProductEditFormComponent],
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
stockFromQuery: string = '';
initialStock: '' | 'inStock' | 'out' = '';
errorMesagge : any = null;

constructor(private productsService : ProductService, private cdr: ChangeDetectorRef, 
  private fb : FormBuilder, private categoryService : CategoryService,
  private router : Router,private route: ActivatedRoute
) {}

ngOnInit(): void {
  this.getAllCategories();
  this.loadProducts();
   this.route.queryParamMap.subscribe(params => {
    const stockParam = params.get('stock') || '';
    this.initialStock =
      Number(stockParam)  > 0 ? 'inStock' :
      Number(stockParam) === 0 ? 'out' : '';
    
    this.loadProducts();
  });  
}

ngOnChanges() {
  if (this.selectedProduct && this.editForm) {
    this.editForm.patchValue({
      name: this.selectedProduct.name,
      price: this.selectedProduct.price,
      description: this.selectedProduct.description,
      stock: this.selectedProduct.stock
    });
  }
}

trackById(index: number, product: any) {
  return product.idproducts;
}

getAllCategories(){
    this.categoryService.getCategories().subscribe({
      next: (data : any) => {
        this.categories = data.categories;
      },
      error: (e) => {
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
  },
  error: (e) => {
    if(e.status === 404){
      this.errorMesagge = 'No hay productos disponibles.';
    }
    else{
      this.errorMesagge = 'Error al cargar los productos.';
    }
  }
})
}

onProductsFiltered(filtered: any[]) {
    this.filteredProducts = filtered;
    this.updatePaginatedProducts();
  }

onVisibilityChange(event: {id:number, visible:boolean}) {
  const product = this.paginatedProducts.find((p:any) => p.idproducts === event.id);
  if (product) product.is_active = event.visible ? 0 : 1;
  
  this.productsService.changeProductVisibility(event.id, event.visible ? 0 : 1).subscribe({
    next: (data:any) => {
    },
    error: (error:any) => {
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


editProduct(event: any) {

  this.selectedProduct = event.product;
}
onDelete(event: {id:number}){
  
  this.productsLoaded = this.productsLoaded.filter((p: any) => p.idproducts !== event.id);

  this.totalPages = Math.ceil(this.productsLoaded.length / this.pageSize);
 
  if (this.currentPage >= this.totalPages) {
    this.currentPage = Math.max(this.totalPages - 1, 0);
  }

  this.updatePaginatedProducts();

  this.cdr.detectChanges();
}


onEditing(event : any) {

  this.selectedProduct = event.product;

}

updateProduct(updatedData: any) {
  const productToUpdate = {
    idproducts: this.selectedProduct.idproducts,
    name: updatedData.name || this.selectedProduct.name,
    description: updatedData.description || this.selectedProduct.description,
    price: updatedData.price || this.selectedProduct.price,
    stock: updatedData.stock || this.selectedProduct.stock,
    id_category: this.selectedProduct.categories_idcategory,
    images: this.selectedProduct.images,
    is_active: this.selectedProduct.is_active
  };

  this.productsService.editProduct(productToUpdate.idproducts, productToUpdate).subscribe({
    next: (res) => {
   
      this.selectedProduct = null;
      this.loadProducts(); 
    },
    error: (err) => {
    }
  });
}


}
