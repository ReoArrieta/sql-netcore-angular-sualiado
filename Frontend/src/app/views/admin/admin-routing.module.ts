import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '@admin/admin.component';

import { EntryComponent } from '@admin/entry/entry.component';
import { AddEntryComponent } from '@admin/entry/addentry/addentry.component';
import { DetailEntryComponent } from '@admin/entry/detailentry/detailentry.component';
import { HomeAdComponent } from '@admin/homead/homead.component';
import { LostComponent } from '@admin/lost/lost.component';
import { AddLostComponent } from './lost/addlost/addlost.component';
import { DetailLostComponent } from '@admin/lost/detaillost/detaillost.component';
import { ProductComponent } from '@admin/product/product.component';
import { ProviderComponent } from '@admin/provider/provider.component';
import { SaleComponent } from '@admin/sale/sale.component';
import { AddSaleComponent } from './sale/addsale/addsale.component';
import { DetailSaleComponent } from '@admin/sale/detailsale/detailsale.component';
import { UserComponent } from '@admin/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'entradas', component: EntryComponent },
      { path: 'entradas/agregar', component: AddEntryComponent },
      { path: 'entradas/detalles/:id', component: DetailEntryComponent },
      { path: 'inicio', component: HomeAdComponent },
      { path: 'inventario', component: ProductComponent },
      { path: 'perdidas', component: LostComponent },
      { path: 'perdidas/agregar', component: AddLostComponent },
      { path: 'perdidas/detalles/:id', component: DetailLostComponent },
      { path: 'ventas', component: SaleComponent },
      { path: 'ventas/agregar', component: AddSaleComponent },
      { path: 'ventas/detalles/:id', component: DetailSaleComponent },
      { path: 'proveedores', component: ProviderComponent },
      { path: 'usuarios', component: UserComponent },
      { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
