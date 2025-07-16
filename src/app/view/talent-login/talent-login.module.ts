import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentLoginRoutingModule } from './talent-login-routing.module';
import { TalentLoginComponent } from './talent-login.component';


@NgModule({
  declarations: [TalentLoginComponent],
  imports: [
    CommonModule,
    TalentLoginRoutingModule
  ]
})
export class TalentLoginModule { }
