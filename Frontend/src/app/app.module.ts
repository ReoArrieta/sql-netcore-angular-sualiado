import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';

import { AuthGuard } from '@security/auth.guard';
import { DialogConfirmComponent } from '@shared/dialogconfirm/dialogconfirm.component';
import { DialogDeleteComponent } from '@shared/dialogdelete/dialogdelete.component';
import { JwtIntepceptor } from '@security/jwt.interceptor';
import { LoginComponent } from '@views/auth/login/login.component';
import { RecoverComponent } from '@views/auth/recover/recover.component';
import { RecoverPasswordComponent } from '@views/auth/recoverpassword/recoverpassword.component';
import { SignupComponent } from '@views/auth/signup/signup.component';
import { CategoryhomeComponent } from '@home/categoryhome/categoryhome.component';
import { HomeJrComponent } from '@home/homejr/homejr.component';
import { ProductHomeComponent } from '@home/producthome/producthome.component';
import { ProductpreviewComponent } from '@home/productpreview/productpreview.component';
import { ToolbarComponent } from '@home/toolbar/toolbar.component';
import { Page404notfoundComponent } from '@views/page404notfound/page404notfound.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DialogConfirmComponent,
    DialogDeleteComponent,
    LoginComponent,
    RecoverComponent,
    RecoverPasswordComponent,
    SignupComponent,
    CategoryhomeComponent,
    HomeJrComponent,
    ProductHomeComponent,
    ToolbarComponent,
    Page404notfoundComponent,
    ProductpreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtIntepceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
// --skipTests
