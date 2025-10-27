import { Routes } from '@angular/router';
import { LoginUserComponent } from './components/auth/login/login-user/login-user.component';
import { LoginAdminComponent } from './components/auth/login/login-admin/login-admin.component';
import { UnregisteredUserComponent } from './components/user/unregistered-user/unregistered-user.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminComponent } from './components/user/admin/admin.component';
import { TouristComponent } from './components/user/tourist/tourist.component';
import { OwnerComponent } from './components/user/owner/owner.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { CottageListComponent } from './components/cottages/cottage-list/cottage-list.component';
import { CottageDetailsComponent } from './components/cottages/cottage-details/cottage-details.component';
import { CottageFormComponent } from './components/cottages/cottage-form/cottage-form.component';
import { CottageRentComponent } from './components/cottages/cottage-rent/cottage-rent.component';
import { TouristReservationsComponent } from './components/reservations/tourist-reservations/tourist-reservations.component';
import { OwnerReservationsComponent } from './components/reservations/owner-reservations/owner-reservations.component';

export const routes: Routes = [
    {path: "", component: UnregisteredUserComponent},
    {path: "login", component: LoginUserComponent},
    {path: "loginAdmin", component: LoginAdminComponent},
    {path: "register", component: RegisterComponent},
    {path: "tourist", component: TouristComponent, children: [
        {path: "profile/:username", component: ProfileComponent},
        {path: "cottages", component: CottageListComponent},
        {path: "cottages/:name", component: CottageDetailsComponent},
        {path: "cottages/:name/rentCottage", component: CottageRentComponent},
        {path: "reservations", component: TouristReservationsComponent}
    ]},
    {path: "owner", component: OwnerComponent, children: [
        {path: "profile/:username", component: ProfileComponent},
        {path: "cottages", component: CottageListComponent},
        {path: "cottages/:name", component: CottageFormComponent},
        {path: "reservations", component: OwnerReservationsComponent}
    ]},
    {path: "admin", component: AdminComponent, children: [
        {path: "profile/:username", component: ProfileComponent},
        {path: "userList", component: UserListComponent}, 
        {path: "userList/:username", component: ProfileComponent},
        {path: "cottages", component: CottageListComponent}
    ]},
    {path: "changePassword", component: ChangePasswordComponent}
];
