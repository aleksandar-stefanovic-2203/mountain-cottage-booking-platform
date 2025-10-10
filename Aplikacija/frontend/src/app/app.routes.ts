import { Routes } from '@angular/router';
import { LoginUserComponent } from './loginForms/login-user/login-user.component';
import { LoginAdminComponent } from './loginForms/login-admin/login-admin.component';

export const routes: Routes = [
    {path: "", component: LoginUserComponent},
    {path: "loginAdmin", component: LoginAdminComponent}
];
