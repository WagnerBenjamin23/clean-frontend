import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule,
    MatCardModule, MatListModule, MatDialogModule, MatTooltipModule,
    MatSelectModule, MatDividerModule, CombosItemComponent
  ],
  templateUrl: './combos-create-form.component.html',
  styleUrls: ['./combos-create-form.component.scss']
})
export class CombosCreateFormComponent implements OnInit, OnChanges {

  
  @Input() products: any[] = [];
  @Input() comboToEdit: any | null = null;
  @Output() comboCreated = new EventEmitter<any>();
  @Output() comboUpdated = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  comboForm!: FormGroup;
  selectedProducts: any[] = [];
  filteredProducts: any[] = [];
  paginatedProducts: any[] = [];
  editMode: boolean = false;
 

  currentPage: number = 0;
  pageSize: number = 3;
  totalPages: number = 1;

  constructor(private fb: FormBuilder, private combosService: CombosService) {
    this.comboForm = this.fb.group({
      name: [''],
      price: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && changes['products'].currentValue) {
      this.initializeForm();
    }
  }

  initializeForm() {
    if (this.comboToEdit) {
      // ----- MODO EDICIÓN -----
      this.editMode = true;
      
      this.comboForm.patchValue({
        name: this.comboToEdit.name,
        price: this.comboToEdit.price,
        description: this.comboToEdit.description
      });

      this.selectedProducts = [...this.comboToEdit.products];
      this.filteredProducts = this.products;
      this.filteredProducts.sort((a, b) => {
      const aSelected = this.isSelected(a) ? 0 : 1;
      const bSelected = this.isSelected(b) ? 0 : 1;
      return aSelected - bSelected;
    });

    } else {
      // ----- MODO CREACIÓN -----
      this.editMode = false;
      this.filteredProducts = [...this.products];
    }

    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
    this.updatePaginatedProducts();
  }

  // 🧩 Selección o eliminación
  toggleProductSelection(product: any, checked: boolean) {
    if (checked) {
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts = this.selectedProducts.filter(p => p.idproducts !== product.idproducts);
    }
  }

  isSelected(product: any): boolean {
    return this.selectedProducts.some(p => p.idproducts === product.idproducts);
  }

   reorderProducts() {
    this.filteredProducts.sort((a, b) => {
      const aSelected = this.isSelected(a) ? 0 : 1;
      const bSelected = this.isSelected(b) ? 0 : 1;
      return aSelected - bSelected;
    });
    this.updatePaginatedProducts();
  }

  removeProduct(product: any) {
    this.selectedProducts = this.selectedProducts.filter(p => p.idproducts !== product.idproducts);
  
    this.reorderProducts();
    this.updatePaginatedProducts();
  }

  saveCombo() {
    if (this.comboForm.valid && this.selectedProducts.length > 0) {
      const comboData = {
        ...this.comboForm.value,
        products: this.selectedProducts.map(p => p.idproducts)
      };

      console.log('COMBO A EDITAR', this.comboToEdit)
      const request = this.editMode
        ? this.combosService.updateCombo(this.comboToEdit.idcombo, comboData)
        : this.combosService.createCombo(comboData);

      request.subscribe({
        next: (response) => {
          console.log('Combo guardado correctamente:', response);
          this.editMode ? this.comboUpdated.emit(response) : this.comboCreated.emit(response);
          this.resetForm();
        },
        error: (error) => console.error('Error guardando el combo:', error)
      });
    } else {
      alert('Completa todos los campos y selecciona al menos un producto.');
    }
  }

  resetForm() {
    this.comboForm.reset();
    this.selectedProducts = [];
    this.filteredProducts = [];
    this.editMode = false;
    this.currentPage = 0;
    this.cancel.emit();
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
