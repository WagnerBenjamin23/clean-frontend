import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../services/product/product.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-product-item',
  imports: [CommonModule,MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {

 
  @Input() product!: any;
  @Input() index!: number;
  currentPage: any;
  totalPages: any;
  

  constructor(private productsService : ProductService, private fb : FormBuilder) { }
  ngOnInit(): void {
     
  }

  
  
  // product-item.component.ts
  @Output() visibilityChange = new EventEmitter<{id:number, visible:boolean}>();
  @Output() isEditing = new EventEmitter<{id:number, isEditing: boolean}>();
  @Output() onDelete = new EventEmitter<{id:number}>();

  toggleVisibility() {
    if(this.product.is_active === 0) {
    this.visibilityChange.emit({id: this.product.idproducts, visible: false })
  }else{
    this.visibilityChange.emit({id: this.product.idproducts, visible: true })
  } 
  }


  toggleEdit() {
    if(this.product.isEditing) {
      this.isEditing.emit({id: this.product.idproducts, isEditing: false })
    }else{
      this.isEditing.emit({id: this.product.idproducts, isEditing: true })
    }  
  }
  
  nextPage() {
  throw new Error('Method not implemented.');
  }
  prevPage() {
  throw new Error('Method not implemented.');
  }


  deleteProduct(idProduct : number) {
  this.productsService.deleteProduct(idProduct).subscribe({
    next: (data) => {
      console.log("Produto borrado")
      this.onDelete.emit({id:this.product.idproducts});
    },
    error: (e) => {
      console.log("Error", e)
    }
  })
}
  editProduct(_t13: any) {
  throw new Error('Method not implemented.');
  }

  }
