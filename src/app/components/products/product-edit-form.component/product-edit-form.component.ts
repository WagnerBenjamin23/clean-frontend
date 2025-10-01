import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-product-edit-form.component',
  imports: [MatInputModule],
  templateUrl: './product-edit-form.component.html',
  styleUrl: './product-edit-form.component.scss'
})
export class ProductEditFormComponent {

  
  constructor( private fb : FormBuilder) {
    
  }


}
