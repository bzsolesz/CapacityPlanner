import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxBootstrapModule } from "../ngx-bootstrap/ngx-bootstrap.module";
import { ChildRoutingModule } from "./child-routing.module";
import { SharedModule } from "../shared";
import { ChildDetailComponent } from "./child-detail/child-detail.component";
import { ChildListComponent } from "./child-list/child-list.component";
import { ChildService } from "./domain/child.service";

@NgModule({
  declarations: [
    ChildDetailComponent,
    ChildListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxBootstrapModule,
    ChildRoutingModule,
    SharedModule
  ],
  providers: [
    ChildService
  ]
})
export class ChildModule {}
