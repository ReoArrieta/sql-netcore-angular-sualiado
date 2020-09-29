import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@security/auth.guard';
import { HomeJrComponent } from '@home/homejr/homejr.component';
import { ProductHomeComponent } from '@home/producthome/producthome.component';
import { ProductpreviewComponent } from '@home/productpreview/productpreview.component';
import { CategoryhomeComponent } from '@home/categoryhome/categoryhome.component';
import { LoginComponent } from '@views/auth/login/login.component';
import { RecoverComponent } from './views/auth/recover/recover.component';
import { RecoverPasswordComponent } from './views/auth/recoverpassword/recoverpassword.component';
import { SignupComponent } from '@views/auth/signup/signup.component';
import { Page404notfoundComponent } from '@views/page404notfound/page404notfound.component';

const routes: Routes = [
  { path: '', component: HomeJrComponent },
  { path: 'productos', component: ProductHomeComponent},
  { path: 'productos/:nombre', component: ProductpreviewComponent},
  { path: 'categorias', component: CategoryhomeComponent},
  { path: 'ingresar', component: LoginComponent },
  { path: 'registrarse', component: SignupComponent },
  { path: 'recuperar', component: RecoverComponent},
  { path: 'recuperar/:token', component: RecoverPasswordComponent},
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@views/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', component: Page404notfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
