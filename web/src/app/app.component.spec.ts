import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { async } from '@angular/core/testing';
import { Component } from '@angular/core';

import { AppComponent} from './app.component';

describe('App Component Tests', () => {

  var fixture: ComponentFixture<AppComponent>;
  var testedComponent: AppComponent;

  @Component({
    selector: 'app-child-detail',
    template: '<div id="childDetailComponent"></div>'
  })
  class ChildDetailCompomentStub {}

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [AppComponent, ChildDetailCompomentStub]
    }).compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(AppComponent);
    testedComponent = fixture.componentInstance;
  });

  it('should display Child Detail Component', () => {

    fixture.detectChanges();

    var childDetailComponentDisplay = fixture.debugElement.query(By.css('#childDetailComponent'));

    expect(childDetailComponentDisplay).not.toBeNull();
  });
});