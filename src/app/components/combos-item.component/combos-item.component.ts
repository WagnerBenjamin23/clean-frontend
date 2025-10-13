import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CurrencyPipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-combos-item',
  imports: [MatCard, MatCardModule, MatButtonModule, MatIconModule, CurrencyPipe, DecimalPipe],
  templateUrl: './combos-item.component.html',
  styleUrl: './combos-item.component.scss'
})
export class CombosItemComponent {
  @Input() combo!: any;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  @Output() visibilityChange = new EventEmitter<any>();

  combos: any[] = [
  {
    id: 1,
    name: 'Combo Lavado Económico',
    description: 'Perfecto para ropa diaria, incluye detergente y lavandina.',
    price: 4100,
    products: [
       {
    idproducts: 1,
    name: 'Jabón Skip',
    price: 8700,
    image_url: 'https://ardiaprod.vtexassets.com/arquivos/ids/330130/Jabon-Liquido-Concentrado-para-Diluir-Skip-Power-Oxi-500-Ml-_2.jpg?v=638599644775500000',
    stock: 200
  },
  {
    idproducts: 2,
    name: 'Detergente Magistral',
    price: 2500,
    image_url: 'https://ardiaprod.vtexassets.com/arquivos/ids/330130/Jabon-Liquido-Concentrado-para-Diluir-Skip-Power-Oxi-500-Ml-_2.jpg?v=638599644775500000',
    stock: 150
  }, // Lavandina Ayudín
    ]
  },
  {
    id: 2,
    name: 'Combo Lavado Premium',
    description: 'Para un lavado superior, deja la ropa suave y perfumada.',
    price: 11500,
    products: [
       {
    idproducts: 1,
    name: 'Jabón Skip',
    price: 8700,
    image_url: 'https://i.imgur.com/skip.jpg',
    stock: 200
  },
  {
    idproducts: 2,
    name: 'Detergente Magistral',
    price: 2500,
    image_url: 'https://i.imgur.com/magistral.jpg',
    stock: 150
  },  // Suavizante Comfort
    ]
  }
]
  
  onDelete(): void {
  
  }

  onEdit(): void {

  }
}
