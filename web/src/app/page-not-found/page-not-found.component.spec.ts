import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';

describe('Page-Not-Found Component', () => {

  var fixture: ComponentFixture<PageNotFoundComponent>;
  var testedComponent: PageNotFoundComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(PageNotFoundComponent);
    testedComponent = fixture.componentInstance;
  });

  it('should should display Page Not Found error message', () => {

    fixture.detectChanges();
    
    var errorMessageDisplay: DebugElement = fixture.debugElement.query(By.css('p'));

    expect(errorMessageDisplay).not.toBeNull();
    expect(errorMessageDisplay.nativeElement.textContent).toBe('Page was not found!');
  });
});