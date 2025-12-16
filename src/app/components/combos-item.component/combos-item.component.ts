import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
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

 
  constructor(){}

  ngOnInit(): void {
  }
  
  onDelete(): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el combo "${this.combo.name}"?`)) {
      this.delete.emit(this.combo.idcombo); 
    }
  }

  onEdit() {
    this.edit.emit(this.combo);
  }

  
}
