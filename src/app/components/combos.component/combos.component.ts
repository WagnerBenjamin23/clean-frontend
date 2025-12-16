import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

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
import { CombosService } from '../../services/combos/combos.service';
import { forkJoin } from 'rxjs';
import { error } from 'console';
import { errorMonitor } from 'events';


@Component({
  selector: 'app-combos',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatCardModule, MatListModule, MatDialogModule, MatTooltipModule, MatSelectModule, MatDividerModule, CombosItemComponent, CombosCreateFormComponent],
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
  selectedCombo: any | null = null; 
  showForm = false;
  errorMessage : any = null


  constructor(private productsService : ProductService, private combosService : CombosService, private cdr : ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCombos();
    this.cdr.detectChanges(); 
  }
  
  loadProducts() {  
    this.productsService.getProducts().subscribe({
      next: (data: any) => {
        this.productsLoaded = data.products;
        this.filteredProducts = this.productsLoaded;
        this.totalPages = Math.ceil(this.filteredProducts.length  / this.pageSize);
        console.log(this.productsLoaded)
        this.currentPage = 0;   

        this.loadCombos();
      
      }
    })
  }

  loadCombos() {
    this.combosService.getCombos().subscribe({
      next: (data: any) => {
        this.combos = data.combos;
        this.errorMessage = null;
        this.refactorCombos();
        this.cdr.detectChanges();
      },
      error: (e) => {
        if (e.status === 404) {
         this.errorMessage = 'No hay combos en este momento.';
        }
        else{
          this.errorMessage = 'Error al cargar los combos.';
        }
         this.cdr.detectChanges();
        
      }
    }) 
  }

  refactorCombos(){
    this.combos = this.combos.map(combo => {
  
    if (!combo.products) {
      return { ...combo, products: [] };
    }

    const productIds = combo.products
      .split(',')
      .map((id: string) => parseInt(id.trim()));

    const comboProducts = this.productsLoaded.filter(p =>
      productIds.includes(p.idproducts)
    );

    return {
      ...combo,
      products: comboProducts
        };
      });
  }

  onComboCreated(newCombo: any) {
    this.combos.push({ ...newCombo, id: this.combos.length + 1 });
    this.showForm = false;
  }

  editCombo(combo: any) {
  this.selectedCombo = combo;
  this.showForm = true;        
  }

  onComboSaved() {
    this.showForm = false;
    this.loadCombos();
  }

  deleteCombo(comboId: number) {
  this.combosService.deleteCombo(comboId).subscribe({
    next: () => {
      this.combos = this.combos.filter(c => c.idcombos !== comboId);

    },
    error: (err) => console.error('Error al eliminar combo:', err)
  });
}


}
