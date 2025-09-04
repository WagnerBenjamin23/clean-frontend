import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin.component/admin.component';
import { AuthComponent } from './components/auth.component/auth.component';

export const routes: Routes = [
    {path: 'login', component: AuthComponent},
    {path: 'admin', component:AdminComponent, children: [
        
    ]},
];
