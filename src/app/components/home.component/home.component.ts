import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { DashboarService } from '../../services/dashboar.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  standalone: true,
  selector: 'app-home.component',
  imports: [CommonModule, DecimalPipe, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 totalProductos = 0;
  totalCategorias = 0;
  totalCombos = 0;
  productosSinStock = 0;
  ultimosProductos: any[] = [];

  constructor( private dashboardService : DashboarService, private router : Router, 
    private productService : ProductService, private cdr : ChangeDetectorRef) {}
  
    ngOnInit(): void {

      this.productService.getUltimosProductos(5).subscribe({
      next: (data :any) => { 
        this.ultimosProductos = data['data'];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando últimos productos', err)
    });
    this.loadDashboardData();
 
  }

  loadDashboardData() {
    this.dashboardService.getDashboardMetrics().subscribe((data: any) => {
      this.totalProductos = data.productsCount;
      this.totalCategorias = data.categoriesCount;
      this.totalCombos = data.combosCount;
      this.productosSinStock = data.productsOutOfStock;
      this.cdr.detectChanges();
    });
  }

  verProductosSinStock() {
    this.router.navigate(['/admin/productos'], { queryParams: { stock: '0' } });
  }
}
