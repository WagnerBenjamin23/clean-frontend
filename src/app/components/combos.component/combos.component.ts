import { Component, OnInit } from '@angular/core';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { CombosItemComponent } from "../combos-item.component/combos-item.component";
import { CombosCreateFormComponent } from "../combos-create-form.component/combos-create-form.component";
import { ProductService } from '../../services/product/product.service';


@Component({
  selector: 'app-combos',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatCardModule, MatListModule, MatDialogModule, MatTooltipModule, MatSelectModule, MatDividerModule, CombosItemComponent, CombosCreateFormComponent],
  templateUrl: './combos.component.html',
  styleUrl: './combos.component.scss'
})
export class CombosComponent implements OnInit {

  filteredProducts: any;
  pageSize: number = 5;
  productsLoaded : any[] = [];
  paginatedProducts : any[] = []
  totalPages: number = 1;
  currentPage: number = 0
  combos: any[] = [];

  constructor(private productsService : ProductService){}

  ngOnInit(): void {
    this.loadProducts();
  }
  
  
  loadProducts() {  
    this.productsService.getProducts().subscribe({
      next: (data: any) => {
        this.productsLoaded = data.products;
        this.filteredProducts = this.productsLoaded;
        console.log( 'productos en combos:', this.productsLoaded)

        this.totalPages = Math.ceil(this.filteredProducts.length  / this.pageSize);
        console.log(this.productsLoaded)
        this.currentPage = 0;   
      }
    })
  }

  onComboCreated(newCombo: any) {
  this.combos.push({ ...newCombo, id: this.combos.length + 1 });
  }

}
