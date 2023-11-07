import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardComponent } from '../../components/shared/card/card.component';
import { TableComponent } from '../../components/shared/table/table.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateUserStoryDialogComponent } from './components/create-user-story-dialog/create-user-story-dialog.component';
import { EnterSessionDialogComponent } from './components/enter-session-dialog/enter-session-dialog.component';
import { SessionRoutingModule } from './session-routing.module';
import { SessionComponent } from './session.component';

@NgModule({
  declarations: [
    SessionComponent,
    CreateUserStoryDialogComponent,
    EnterSessionDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SessionRoutingModule,
    TableComponent,
    CardComponent,
  ],
})
export class SessionModule {}
