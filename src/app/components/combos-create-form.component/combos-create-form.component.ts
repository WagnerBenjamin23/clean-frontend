import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
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
import { CombosItemComponent } from '../combos-item.component/combos-item.component';
import { CombosService } from '../../services/combos/combos.service';



@Component({
  selector: 'app-combos-create-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatCardModule, MatListModule, MatDialogModule, MatTooltipModule, MatSelectModule, MatDividerModule, CombosItemComponent],
  templateUrl: './combos-create-form.component.html',
  styleUrl: './combos-create-form.component.scss'
})
export class CombosCreateFormComponent implements OnInit, OnChanges{



@Input() products: any[] = []; 
@Output() comboCreated = new EventEmitter<any>();
comboForm!: FormGroup;
selectedProducts: any[] = [];
currentPage: number = 0;
pageSize: number = 3;
totalPages: number = 1;
paginatedProducts: any[] = [];
creating: boolean = false


constructor(private fb : FormBuilder, private combosService : CombosService) { 
  this.comboForm = this.fb.group({
    name: [''],
    description: [''],
    price: [''],
  }); 
}

ngOnInit(): void {

}
ngOnChanges(changes: any): void {
  if (changes['products'] && this.products) {
    this.filteredProducts = [...this.products];
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
    this.updatePaginatedProducts();
  }
}


filteredProducts: any[] = this.products;


toggleProductSelection(product: any, checked: boolean) {
    if (checked) {
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts = this.selectedProducts.filter(p => p.idproducts !== product.idproducts);
    }
  }

  createCombo() {
    if (this.comboForm.valid && this.selectedProducts.length > 0) {
     const newCombo = {
      ...this.comboForm.value,
      products: this.selectedProducts.map(product => product.idproducts) 
    };
    console.log('Datos del nuevo combo:', newCombo);
      this.combosService.createCombo(newCombo).subscribe({
        next: (response) => {
          console.log('Combo creado con éxito:', response); 
        },
        error: (error) => {
          console.error('Error al crear el combo:', error);
        }
      })

      this.comboCreated.emit(newCombo);
      this.comboForm.reset();
      this.selectedProducts = [];
      console.log('Nuevo combo creado:', newCombo);
    } else {
      alert('Completa todos los campos y selecciona al menos un producto.');
    }
  }

  updatePaginatedProducts() {
     const start = this.currentPage * this.pageSize;
     this.paginatedProducts = this.filteredProducts.slice(start, start + this.pageSize);
     this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
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


}
