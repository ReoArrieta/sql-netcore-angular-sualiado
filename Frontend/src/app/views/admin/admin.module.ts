import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from '@admin/admin.component';
import { AdminRoutingModule } from '@admin/admin-routing.module';
import { MaterialModule } from '@app/material.module';

import { EntryComponent } from '@admin/entry/entry.component';
import { AddEntryComponent } from '@admin/entry/addentry/addentry.component';
import { DetailEntryComponent } from '@admin/entry/detailentry/detailentry.component';
import { HomeAdComponent } from '@admin/homead/homead.component';
import { LostComponent } from '@admin/lost/lost.component';
import { AddLostComponent } from '@admin/lost/addlost/addlost.component';
import { DetailLostComponent } from '@admin/lost/detaillost/detaillost.component';
import { ProductComponent } from '@admin/product/product.component';
import { CategoryComponent } from '@admin/product/category/category.component';
import { DialogProductComponent } from '@admin/product/dialogproduct/dialogproduct.component';
import { DialogCategoryComponent } from '@admin/product/category/dialogcategory/dialogcategory.component';
import { ProviderComponent } from '@admin/provider/provider.component';
import { DialogProviderComponent } from '@admin/provider/dialogprovider/dialogprovider.component';
import { SaleComponent } from '@admin/sale/sale.component';
import { AddSaleComponent } from '@admin/sale/addsale/addsale.component';
import { DetailSaleComponent } from '@admin/sale/detailsale/detailsale.component';
import { UserComponent } from '@admin/user/user.component';
import { ClientComponent } from '@admin/user/client/client.component';

@NgModule({
  declarations: [
    AdminComponent,
    EntryComponent,
    AddEntryComponent,
    DetailEntryComponent,
    HomeAdComponent,
    LostComponent,
    AddLostComponent,
    DetailLostComponent,
    ProductComponent,
    CategoryComponent,
    DialogProductComponent,
    DialogCategoryComponent,
    ProviderComponent,
    DialogProviderComponent,
    SaleComponent,
    AddSaleComponent,
    DetailSaleComponent,
    UserComponent,
    ClientComponent,
  ],
  imports: [AdminRoutingModule, CommonModule, MaterialModule],
})
export class AdminModule {}
