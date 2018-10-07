import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChildDetailComponent } from "./child-detail/child-detail.component";
import { ChildListComponent } from "./child-list/child-list.component";
import { ChildDetailPageAction } from "./child-detail/child-detail-page-action";

const childRoutes: Routes = [
  { path: "child", children: [
    { path: "all", component: ChildListComponent },
    { path: "add", component: ChildDetailComponent, data: {pageAction: ChildDetailPageAction.ADD}},
    { path: ":id", component: ChildDetailComponent, data: {pageAction: ChildDetailPageAction.VIEW}},
    { path: "", redirectTo: "all", pathMatch: "full" }
  ]}
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
