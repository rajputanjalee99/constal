import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ProfileDetailsRoutingModule } from './profile-details-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileDetailsRoutingModule,
    NgxIntlTelInputModule
  ]
})
export class ProfileDetailsModule { }
