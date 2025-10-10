import { Routes } from '@angular/router';
import { LoginUserComponent } from './loginForms/login-user/login-user.component';
import { LoginAdminComponent } from './loginForms/login-admin/login-admin.component';
import { UnregisteredUserComponent } from './userForms/unregistered-user/unregistered-user.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: "", component: UnregisteredUserComponent},
    {path: "login", component: LoginUserComponent},
    {path: "register", component: RegisterComponent},
    {path: "loginAdmin", component: LoginAdminComponent}
];
