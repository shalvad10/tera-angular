import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Views/login/login.component';
import { RegisterComponent } from './Views/register/register.component';
import { AuthGuard } from './Services/auth.guard';
import { MainComponent } from './Views/main/main.component';
import { AdminGuard } from './Services/admin.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'admin',
    pathMatch: 'full'
  },
  {
    path:'admin',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'users',
    loadChildren:()=> import('./Views/Users/users.module').then(m=> m.UsersModule),
    canActivate: [AdminGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
