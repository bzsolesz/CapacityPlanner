import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { async } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";

import { AppComponent } from "./app.component";

describe("App Component", () => {

  let fixture: ComponentFixture<AppComponent>;
  let testedComponent: AppComponent;

  @Component({
    // tslint:disable-next-line: component-selector
    selector: "router-outlet",
    template: "<div></div>"
  })
  class RouterOutletStubComponent {}

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ AppComponent, RouterOutletStubComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(AppComponent);
    testedComponent = fixture.componentInstance;
  });

  it("should display the Router Outlet for routed views", () => {

    fixture.detectChanges();

    const routerOutletDisplay: DebugElement = fixture.debugElement.query(By.css("router-outlet"));

    expect(routerOutletDisplay).not.toBeNull();
  });
});
