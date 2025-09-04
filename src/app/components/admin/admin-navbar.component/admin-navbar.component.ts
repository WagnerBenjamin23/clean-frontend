import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  standalone: true,
  selector: 'app-admin-navbar',
  imports: [MatIcon, MatMenuModule, MatSidenavModule, MatListModule, RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss'
})
export class AdminNavbarComponent {
  menuOpen = false;

  constructor(private router: Router, private authService : AuthService) {}      

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
