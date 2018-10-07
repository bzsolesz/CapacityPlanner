import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ChildModule } from "./child/child.module";
import { AttendanceModule } from "./attendance/attendance.module";

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChildModule,
    AttendanceModule,
    AppRoutingModule
  ]
})
export class AppModule { }
