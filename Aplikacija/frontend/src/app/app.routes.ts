import { Routes } from '@angular/router';
import { LoginUserComponent } from './loginForms/login-user/login-user.component';
import { LoginAdminComponent } from './loginForms/login-admin/login-admin.component';
import { UnregisteredUserComponent } from './userForms/unregistered-user/unregistered-user.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './userForms/admin/admin.component';
import { TouristComponent } from './userForms/tourist/tourist.component';
import { OwnerComponent } from './userForms/owner/owner.component';
import { ChangePasswordComponent } from './userForms/change-password/change-password.component';
import { ProfileComponent } from './userForms/profile/profile.component';
import { UserListComponent } from './userForms/user-list/user-list.component';
import { CottagesComponent } from './userForms/cottages/cottages.component';
import { CottageDetailsComponent } from './userForms/cottage-details/cottage-details.component';

export const routes: Routes = [
    {path: "", component: UnregisteredUserComponent},
    {path: "login", component: LoginUserComponent},
    {path: "loginAdmin", component: LoginAdminComponent},
    {path: "register", component: RegisterComponent},
    {path: "tourist", component: TouristComponent, children: [
        {path: "profile/:username", component: ProfileComponent},
        {path: "cottages", component: CottagesComponent},
        {path: "cottages/:name", component: CottageDetailsComponent}
    ]},
    {path: "owner", component: OwnerComponent, children: [
        {path: "profile/:username", component: ProfileComponent},
        {path: "cottages", component: CottagesComponent}
    ]},
    {path: "admin", component: AdminComponent, children: [
        {path: "profile/:username", component: ProfileComponent},
        {path: "userList", component: UserListComponent}, 
        {path: "userList/:username", component: ProfileComponent},
        {path: "cottages", component: CottagesComponent}
    ]},
    {path: "changePassword", component: ChangePasswordComponent}
];
