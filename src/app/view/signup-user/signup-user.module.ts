import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupUserRoutingModule } from './signup-user-routing.module';
import { SignupUserComponent } from './signup-user.component';

import { ParticlesModule } from 'angular-particle';

@NgModule({
  declarations: [SignupUserComponent],
  imports: [
    CommonModule,
    SignupUserRoutingModule,
    ParticlesModule
  ]
})
export class SignupUserModule { }
