import { ComponentFixture, TestBed, fakeAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { RouterTestingModule } from "@angular/router/testing";
import { ChildListComponent } from "./child-list.component";
import { ChildService, Child } from "../domain";
import { RouterLinkDirectiveStub } from "../../test-utils";

describe("Child-List Component", () => {
  let fixture: ComponentFixture<ChildListComponent>;
  let testedComponent: ChildListComponent;
  let childServiceSpy: ChildServiceSpy;
  let childListPage: ChildListPage;
  let testChildren: Child[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChildListComponent,
        RouterLinkDirectiveStub
      ],
      imports: [ RouterTestingModule ],
      providers: [ { provide: ChildService, useClass: ChildServiceSpy } ]
    });
    fixture = TestBed.createComponent(ChildListComponent);
    testedComponent = fixture.componentInstance;
    // tslint:disable-next-line: no-any
    childServiceSpy = fixture.debugElement.injector.get(ChildService) as any;
    childListPage = new ChildListPage(fixture);

    initTestChildren();
  });

  it(`should get the Children list at initialization by ChildService.getAllChildren
    and have a link for each Child Detail page`, () => {
    childServiceSpy.getAllChildren.and.returnValue(of(testChildren));

    fixture.detectChanges();
    childListPage.initPage();

    expect(childServiceSpy.getAllChildren).toHaveBeenCalledTimes(1);
    expect(testedComponent.children).toBe(testChildren);
    expect(childListPage.childListDisplay).not.toBeNull();

    const childListItems: DebugElement[] = childListPage.childListDisplay.queryAll(By.css("a"));
    expect(childListItems.length).toBe(2);
    expectChildListItemToBeChild(childListItems[0], testChildren[0]);
    expectChildListItemToBeChild(childListItems[1], testChildren[1]);
    expectNoErrorMessage();
  });

  it("should display empty list if no Child", () => {
    childServiceSpy.getAllChildren.and.returnValue(of([]));

    fixture.detectChanges();
    childListPage.initPage();

    expect(childServiceSpy.getAllChildren).toHaveBeenCalledTimes(1);
    expectNoChildren();
    expectNoErrorMessage();
  });

  it("should display the error message when query for all Children failed", () => {
    const error: Error = new Error("An error has happened");

    childServiceSpy.getAllChildren.and.returnValue(Observable.throw(error));

    fixture.detectChanges();
    childListPage.initPage();

    expect(childServiceSpy.getAllChildren).toHaveBeenCalledTimes(1);
    expectNoChildren();
    expect(testedComponent.queryErrorMessage).toBe(error.message);
    expect(childListPage.errorMessageDisplay.nativeElement.textContent).toBe(error.message);
  });

  it("should have an Add Child button", fakeAsync(() => {
    childServiceSpy.getAllChildren.and.returnValue(of([]));

    fixture.detectChanges();
    childListPage.initPage();

    const routerLink: RouterLinkDirectiveStub =
      childListPage.addChildButtonRouterLink.injector.get(RouterLinkDirectiveStub);
    expect(routerLink.routerLink[0]).toEqual("/child/add");
  }));

  function initTestChildren(): void {
    const testChild1: Child = {id: 1, firstName: "firstName1", surname: "surname1", dateOfBirth: "01/01/1981"};
    const testChild2: Child = {id: 2, firstName: "firstName2", surname: "surname2", dateOfBirth: "02/02/1982"};
    testChildren = [testChild1, testChild2];
  }

  function expectChildListItemToBeChild(childListItem: DebugElement, child: Child): void {
    const expectedChildListItem: string = `${child.firstName} ${child.surname} (${child.dateOfBirth})`;
    expect(childListItem.nativeElement.textContent).toContain(expectedChildListItem);
    expect(childListItem.nativeElement.getAttribute("href")).toBe(`/child/${child.id}`);
  }

  function expectNoChildren(): void {
    expect(testedComponent.children.length).toBe(0);
    expect(childListPage.childListDisplay).not.toBeNull();
    expect(childListPage.childListDisplay.queryAll(By.css("li")).length).toBe(0);
  }

  function expectNoErrorMessage(): void {
    expect(testedComponent.queryErrorMessage).toBeNull();
    expect(childListPage.errorMessageDisplay).toBeNull();
  }
});

class ChildListPage {
  constructor(private fixture: ComponentFixture<ChildListComponent>)  {}

  public childListDisplay: DebugElement;
  public errorMessageDisplay: DebugElement;
  public addChildButtonRouterLink: DebugElement;

  public initPage(): void {
    this.childListDisplay = this.fixture.debugElement.query(By.css("#childListDisplay"));
    this.errorMessageDisplay = this.fixture.debugElement.query(By.css("#errorMessageDisplay"));
    this.addChildButtonRouterLink = this.fixture.debugElement.query(By.directive(RouterLinkDirectiveStub));
  }
}

class ChildServiceSpy {
  public getAllChildren: jasmine.Spy = jasmine.createSpy("getAllChildren");
}
