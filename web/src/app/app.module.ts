import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxBootstrapModule } from './ngx-bootstrap/ngx-bootstrap.module';

import { AppComponent } from './app.component';
import { ChildService } from './service/child.service';
import { ChildDetailComponent } from './child-detail/child-detail.component';
import { ChildListComponent } from './child-list/child-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildDetailComponent,
    ChildListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxBootstrapModule
  ],
  providers: [ChildService],
  bootstrap: [AppComponent]
})
export class AppModule { }
