import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ChildListComponent } from './child-list.component';
import { ChildService } from '../domain/child.service';
import { Child } from '../domain/child';

describe('Child-List Component', () => {

  var fixture: ComponentFixture<ChildListComponent>;
  var testedComponent: ChildListComponent;

  class ChildServiceSpy {
    getAllChildren = jasmine.createSpy('getAllChildren');
  }

  class ChildListPage {
    childListDisplay: DebugElement;
    errorMessageDisplay: DebugElement;

    initPage(): void {
      this.childListDisplay = fixture.debugElement.query(By.css("#childListDisplay"));
      this.errorMessageDisplay = fixture.debugElement.query(By.css("#errorMessageDisplay"));
    };
  }

  var childServiceSpy: ChildServiceSpy;
  var childListPage: ChildListPage;
  var testChildren: Child[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildListComponent ],
      providers: [ { provide: ChildService, useClass: ChildServiceSpy } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ChildListComponent);
    testedComponent = fixture.componentInstance;

    childServiceSpy = fixture.debugElement.injector.get(ChildService) as any;

    childListPage = new ChildListPage();

    initTestChildren();
  });

  it('should get the list of Children at initialization by ChildService.getAllChildren and display them', () => {

    childServiceSpy.getAllChildren.and.returnValue(of(testChildren));

    fixture.detectChanges();
    childListPage.initPage();

    expect(childServiceSpy.getAllChildren).toHaveBeenCalledTimes(1);

    expect(testedComponent.children).toBe(testChildren);

    expect(childListPage.childListDisplay).not.toBeNull();

    var childListItems = childListPage.childListDisplay.queryAll(By.css('li'));

    expect(childListItems.length).toBe(2);
    expect(childListItems[0].nativeElement.textContent).toContain(stringOf(testChildren[0]));
    expect(childListItems[1].nativeElement.textContent).toContain(stringOf(testChildren[1]));

    expectNoErrorMessage();
  });

  it('should display empty list if no Child', () => {

    childServiceSpy.getAllChildren.and.returnValue(of([]));

    fixture.detectChanges();
    childListPage.initPage();

    expect(childServiceSpy.getAllChildren).toHaveBeenCalledTimes(1);

    expectNoChildren();
    expectNoErrorMessage();
  });

  it('should display the error message when query for all Children failed', () => {

    var error: Error = new Error("An error has happened");

    childServiceSpy.getAllChildren.and.returnValue(Observable.throw(error));

    fixture.detectChanges();
    childListPage.initPage();

    expect(childServiceSpy.getAllChildren).toHaveBeenCalledTimes(1);

    expectNoChildren();

    expect(testedComponent.queryErrorMessage).toBe(error.message);
    expect(childListPage.errorMessageDisplay.nativeElement.textContent).toBe(error.message);
  });

  function initTestChildren(): void {
    var testChild1: Child = new Child();
    var testChild2: Child = new Child();

    testChild1.id = 1;
    testChild1.firstName = "firstName1";
    testChild1.surname = "surname1";
    testChild1.dateOfBirth = "01/01/1981"

    testChild2.id = 2;
    testChild2.firstName = "firstName2";
    testChild2.surname = "surname2";
    testChild2.dateOfBirth = "02/02/1982"

    testChildren = [testChild1, testChild2];
  };

  function stringOf(child: Child): string {
    return `${child.firstName} ${child.surname} (${child.dateOfBirth})`;
  };

  function expectNoChildren() {
    expect(testedComponent.children.length).toBe(0);

    expect(childListPage.childListDisplay).not.toBeNull();
    expect(childListPage.childListDisplay.queryAll(By.css('li')).length).toBe(0);
  }

  function expectNoErrorMessage() {
    expect(testedComponent.queryErrorMessage).toBeNull();
    expect(childListPage.errorMessageDisplay).toBeNull();
  }
});
