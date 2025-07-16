import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { ProfileSettingsComponent } from "./profile-settings.component";

@NgModule({
  declarations: [ProfileSettingsComponent,ConfirmDialogComponent],
  imports: [
    CommonModule,
    ProfileSettingsRoutingModule
  ],
  entryComponents : [ProfileSettingsComponent]
})
export class ProfileSettingsModule { }
