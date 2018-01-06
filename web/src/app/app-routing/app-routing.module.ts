import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChildDetailComponent } from '../child-detail/child-detail.component';
import { ChildListComponent } from '../child-list/child-list.component';

import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'children', component: ChildListComponent },
  { path: 'child', component: ChildDetailComponent },
  { path: '', redirectTo: 'children', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    PageNotFoundComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
