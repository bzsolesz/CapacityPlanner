import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterOutletComponentStub, RouterLinkDirectiveStub, CommonTestSteps } from "./test-utils";
import { DebugElement } from "@angular/core";

describe("App Component", () => {
  let steps: Steps;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutletComponentStub,
      RouterLinkDirectiveStub
    ]
    });
    steps = new Steps(TestBed.createComponent(AppComponent));
  });

  it("should display the Router Outlet for routed views", () => {
    steps.whenDetectChanges();
    steps.thenRouterOutletIsDisplayed();
  });

  it("should have a navigation link to Child page", () => {
    steps.whenDetectChanges();
    steps.thenChildLinkIsDisplayed();
  });

  it("should have a navigation link to Attendance page", () => {
    steps.whenDetectChanges();
    steps.thenAttendanceLinkIsDisplayed();
  });
});

class Steps extends CommonTestSteps<AppComponent> {
  public thenRouterOutletIsDisplayed(): void {
    expect(this.nativeElementByCss(Page.ROUTER_OUTLET)).not.toBeNull();
  }

  public thenChildLinkIsDisplayed(): void {
    const routerLinkHosts: DebugElement[] = this.debugElementsByDirective(RouterLinkDirectiveStub);
    expect(routerLinkHosts[0].injector.get(RouterLinkDirectiveStub).routerLink[0]).toEqual("/child");
  }

  public thenAttendanceLinkIsDisplayed(): void {
    const routerLinkHosts: DebugElement[] = this.debugElementsByDirective(RouterLinkDirectiveStub);
    expect(routerLinkHosts[1].injector.get(RouterLinkDirectiveStub).routerLink[0]).toEqual("/attendance");
  }
}

class Page {
  public static readonly ROUTER_OUTLET: string = "router-outlet";
}
