import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChildDetailComponent } from './child-detail/child-detail.component';
import { ChildListComponent } from './child-list/child-list.component';

const childRoutes: Routes = [
  { path: 'children', component: ChildListComponent },
  { path: 'child', component: ChildDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChildRoutingModule {}