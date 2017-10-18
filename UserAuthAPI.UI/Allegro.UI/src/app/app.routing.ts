import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainPageComponent } from './main-page/main-page.component';
import { OfficeComponent } from './office/office.component';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {ActivateIfLoggedInGuard} from './guards/activate-if-logged-in.guard';
import {DontActivateIfLoggedInGuard} from './guards/dont-activate-if-logged-in.guard';
const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'mainpage', pathMatch: 'full' },
    { path: 'mainpage', component: MainPageComponent },
    { path: 'office', component: OfficeComponent, canActivate: [ActivateIfLoggedInGuard] },
    {
        path: 'user',
        component: UserComponent,
        children: [
            { path: 'login', component: LoginComponent, canActivate: [DontActivateIfLoggedInGuard]},
            { path: 'register', component: RegisterComponent, canActivate:[DontActivateIfLoggedInGuard]}
        ]
    },

    { path: '**', component: NotFoundComponent }
    
];
export const Routing = RouterModule.forRoot(APP_ROUTES);