import { Routes } from '@angular/router';
import { LoginUserComponent } from './loginForms/login-user/login-user.component';
import { LoginAdminComponent } from './loginForms/login-admin/login-admin.component';
import { UnregisteredUserComponent } from './userForms/unregistered-user/unregistered-user.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './userForms/admin/admin.component';
import { TouristComponent } from './userForms/tourist/tourist.component';
import { OwnerComponent } from './userForms/owner/owner.component';
import { ChangePasswordComponent } from './userForms/change-password/change-password.component';

export const routes: Routes = [
    {path: "", component: UnregisteredUserComponent},
    {path: "login", component: LoginUserComponent},
    {path: "loginAdmin", component: LoginAdminComponent},
    {path: "register", component: RegisterComponent},
    {path: "tourist", component: TouristComponent},
    {path: "owner", component: OwnerComponent},
    {path: "admin", component: AdminComponent},
    {path: "changePassword", component: ChangePasswordComponent}
];
