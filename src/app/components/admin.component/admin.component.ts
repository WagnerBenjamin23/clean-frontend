import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin/admin-navbar.component/admin-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin.component',
  imports: [RouterOutlet, AdminNavbarComponent],
  providers: [{useClass: AdminNavbarComponent, provide: AdminNavbarComponent}],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
