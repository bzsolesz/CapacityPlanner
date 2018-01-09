import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ChildDetailComponent } from './child-detail/child-detail.component';
import { ChildListComponent } from './child-list/child-list.component';
import { ChildService } from './domain/child.service';

import { ChildRoutingModule } from './child-routing.module';

@NgModule({
  declarations: [
    ChildDetailComponent,
    ChildListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ChildRoutingModule
  ],
  providers: [
    ChildService
  ]
})
export class ChildModule { }