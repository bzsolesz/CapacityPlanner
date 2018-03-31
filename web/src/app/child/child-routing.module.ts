import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ChildDetailComponent } from "./child-detail/child-detail.component";
import { ChildListComponent } from "./child-list/child-list.component";

const childRoutes: Routes = [
  { path: "child/all", component: ChildListComponent },
  { path: "child/:id", component: ChildDetailComponent }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(childRoutes)
  ]
})
export class ChildRoutingModule {}
