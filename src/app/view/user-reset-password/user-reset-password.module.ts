import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserResetPasswordRoutingModule } from './user-reset-password-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserResetPasswordRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ]
})
export class UserResetPasswordModule { }
