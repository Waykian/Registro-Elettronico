import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FolderPageRoutingModule } from './folder-routing.module';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { FolderPage } from './folder.page';
import { KoModalComponent } from '../ko-modal/ko-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FolderPageRoutingModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [ NgxSmartModalService ],
  declarations: [FolderPage, KoModalComponent]
})
export class FolderPageModule {}
