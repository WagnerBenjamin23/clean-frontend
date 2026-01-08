import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { ProductService } from '../../../services/product/product.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-edit-form',
  imports: [MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './product-edit-form.component.html',
  styleUrl: './product-edit-form.component.scss'
})
export class ProductEditFormComponent implements OnInit{
  @Input() selectedProduct: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  editForm!: FormGroup;


  


  
  constructor( private fb : FormBuilder, private productService: ProductService) {
  }
  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [''],
      price: [''],
      description: [''],
      stock: ['']
    })
  }

  onSave() {
    if (this.editForm.valid) {
      console.log('Form values to save:', this.editForm.value);
      this.save.emit(this.editForm.value);
    }
  }

  onCancel() {
  this.cancel.emit();
  }


}
