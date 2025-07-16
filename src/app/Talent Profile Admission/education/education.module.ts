import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EducationRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule
  ]
})
export class EducationModule { }
