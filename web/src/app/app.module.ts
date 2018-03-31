import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { AppRoutingModule } from "./app-routing.module";

import { ChildModule } from "./child/child.module";

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChildModule,
    AppRoutingModule
  ]
})
export class AppModule { }
