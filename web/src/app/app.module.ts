import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChildService } from './service/child.service';
import { ChildDetailComponent } from './child-detail/child-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ChildService],
  bootstrap: [AppComponent]
})
export class AppModule { }
