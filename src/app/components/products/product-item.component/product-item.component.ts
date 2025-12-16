import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
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
  isSmallScreen = false;
  showMenu = false;

  constructor(private productsService : ProductService, private fb : FormBuilder) { }
  ngOnInit(): void {
     this.checkScreenSize();
  }

  
  
  // product-item.component.ts
  @Output() visibilityChange = new EventEmitter<{id:number, visible:boolean}>();
  @Output() edit = new EventEmitter<{product:any, isEditing: boolean}>();
  @Output() onDelete = new EventEmitter<{id:number}>();
  @Output() save = new EventEmitter<any>();


  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768; // podés ajustar el breakpoint
    if (!this.isSmallScreen) {
      this.showMenu = false; // cerrar menú al agrandarse la pantalla
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }


  toggleVisibility() {
    if(this.product.is_active === 0) {
    this.visibilityChange.emit({id: this.product.idproducts, visible: false })
  }else{
    this.visibilityChange.emit({id: this.product.idproducts, visible: true })
  } 
  }


  toggleEdit() {
    if(this.product.isEditing) {
      this.edit.emit({product: this.product, isEditing: false })
    }else{
      this.edit.emit({product: this.product, isEditing: true })
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


  }
