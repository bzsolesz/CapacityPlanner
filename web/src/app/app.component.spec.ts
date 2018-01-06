import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { async } from '@angular/core/testing';
import { Component } from '@angular/core';

import { AppComponent} from './app.component';

describe('App Component', () => {

  var fixture: ComponentFixture<AppComponent>;
  var testedComponent: AppComponent;

  @Component({
    selector: 'router-outlet',
    template: '<div></div>'
  })
  class RouterOutletStub {}

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [AppComponent, RouterOutletStub]
    }).compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(AppComponent);
    testedComponent = fixture.componentInstance;
  });

  it('should display the Router Outlet for routed views', () => {

    fixture.detectChanges();

    var routerOutletDisplay = fixture.debugElement.query(By.css('router-outlet'));    

    expect(routerOutletDisplay).not.toBeNull();
  })
});