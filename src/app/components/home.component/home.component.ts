import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DashboarService } from '../../services/dashboar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home.component',
  imports: [DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 totalProductos = 0;
totalCategorias = 0;
totalCombos = 0;
productosSinStock = 0;

  constructor( private dashboardService : DashboarService, private router : Router) {}
  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getDashboardMetrics().subscribe((data: any) => {
      this.totalProductos = data.productsCount;
      this.totalCategorias = data.categoriesCount;
      this.totalCombos = data.combosCount;
      this.productosSinStock = data.productsOutOfStock;
    });
  }

  verProductosSinStock() {
    // Puedes redirigir a la página de productos con filtro de stock cero
    this.router.navigate(['/admin/productos'], { queryParams: { stock: '0' } });
  }
}
