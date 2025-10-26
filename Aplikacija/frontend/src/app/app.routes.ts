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
import { CottageFormComponent } from './userForms/cottage-form/cottage-form.component';
import { CottageRentComponent } from './userForms/cottage-rent/cottage-rent.component';
import { TouristReservationsComponent } from './userForms/tourist-reservations/tourist-reservations.component';
import { OwnerReservationsComponent } from './userForms/owner-reservations/owner-reservations.component';

export const routes: Routes = [
    {path: "", component: UnregisteredUserComponent},
    {path: "login", component: LoginUserComponent},
    {path: "loginAdmin", component: LoginAdminComponent},
    {path: "register", component: RegisterComponent},
    {path: "tourist", component: TouristComponent, children: [
        {path: "profile/:username", component: ProfileComponent},
        {path: "cottages", component: CottagesComponent},
        {path: "cottages/:name", component: CottageDetailsComponent},
        {path: "cottages/:name/rentCottage", component: CottageRentComponent},
        {path: "reservations", component: TouristReservationsComponent}
    ]},
    {path: "owner", component: OwnerComponent, children: [
        {path: "profile/:username", component: ProfileComponent},
        {path: "cottages", component: CottagesComponent},
        {path: "cottages/:name", component: CottageFormComponent},
        {path: "reservations", component: OwnerReservationsComponent}
    ]},
    {path: "admin", component: AdminComponent, children: [
        {path: "profile/:username", component: ProfileComponent},
        {path: "userList", component: UserListComponent}, 
        {path: "userList/:username", component: ProfileComponent},
        {path: "cottages", component: CottagesComponent}
    ]},
    {path: "changePassword", component: ChangePasswordComponent}
];
