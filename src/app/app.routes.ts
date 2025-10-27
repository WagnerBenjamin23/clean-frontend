import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin.component/admin.component';
import { AuthComponent } from './components/auth.component/auth.component';
import { authGuard } from './guards/auth-guard';
import { ProductsComponent } from './components/products/products.component/products.component';
import { HomeComponent } from './components/home.component/home.component';
import { CategoriesComponent } from './components/categories.component/categories.component';
import { CombosComponent } from './components/combos.component/combos.component';
export const routes: Routes = [
    {path: 'login', component: AuthComponent},
    {path: 'admin', component:AdminComponent,  children: [
        {path:'', redirectTo: 'inicio', pathMatch: 'full'},
        {path:'inicio', component: HomeComponent},
        {path: 'categorias', component: CategoriesComponent},
        {path: 'productos', component: ProductsComponent},
        {path: 'combos', component: CombosComponent}

    ]},
];
