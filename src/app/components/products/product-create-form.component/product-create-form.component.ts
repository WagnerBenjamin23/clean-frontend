import { Component, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { UploadImagesComponent } from '../upload-images.component/upload-images.component';
import { ProductService } from '../../../services/product/product.service';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  standalone: true,
  selector: 'app-product-create-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    UploadImagesComponent,
    MatSelectModule
  ],
  templateUrl: './product-create-form.component.html',
  styleUrls: ['./product-create-form.component.scss']
})
export class ProductCreateFormComponent implements OnInit {
  productForm!: FormGroup;
  selectedFiles: File[] = [];
  categories: any[] = [];
  isSubmitting = false;
  

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      id_category: [null, Validators.required]
    });

    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: any) => (this.categories = data.categories),
      error: (err) => console.error(err)
    });
  }

  onFilesChanged(files: File[]) {
    this.selectedFiles = files;
  
  }

  submit() {
  if (this.productForm.invalid || this.selectedFiles.length === 0) {
    console.warn('Formulario incompleto o sin imágenes');
    return;
  }

  this.isSubmitting = true;

 
  const uploadPromises = this.selectedFiles.map(file => {
    const data = new FormData();         
    data.append('file', file);
    data.append('upload_preset', 'clean_web'); 

    return fetch('https://api.cloudinary.com/v1_1/db6i1piht/image/upload', {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(res => res['secure_url']);
  
  });

  Promise.all(uploadPromises)
    .then(imageUrls => {
      console.log('URL',imageUrls)
      const productData = {
        ...this.productForm.value,
        images: imageUrls
      };

      console.log('JSON a enviar al backend:', productData);

    
      this.productService.createProduct(productData).subscribe({
        next: (res) => {
          console.log('Producto creado:', res);
          this.productForm.reset();
          this.selectedFiles = [];
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error al crear producto:', err);
          this.isSubmitting = false;
        }
      });
    })
    .catch(err => {
      console.error('Error subiendo imágenes:', err);
      this.isSubmitting = false;
    });
}

}
