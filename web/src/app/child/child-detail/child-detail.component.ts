import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, ParamMap, Data } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs/Observable";
// TODO move operator additions to a centralized space
import "rxjs/add/operator/map";
import { fromDateToEnGBString, fromEnGbBStringToDate } from "../../utility";
import { defaultDatePickerConfig } from "../../ngx-bootstrap";
import { Child } from "../domain/child";
import { ChildService } from "../domain/child.service";
import { AddedChild } from "../domain/added-child";
import { ChildDetailPageAction } from "./child-detail-page-action";

@Component({
  templateUrl: "./child-detail.component.html"
})
export class ChildDetailComponent implements OnInit {
  public child: Child;
  public queryErrorMessage: string;
  public dateOfBirthPickerValue: Date;
  public datePickerConfig: object = defaultDatePickerConfig;
  public pageAction: ChildDetailPageAction;

  @ViewChild(NgForm)
  public childForm: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private childService: ChildService
  ) { }

  public ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.pageAction = data["pageAction"];
      this.isViewPageAction() ? this.initViewChildPage() : this.initAddChildPage();
    });
  }

  public getChildById(id: number): void {
    this.childService.getChildById(id).subscribe(
      (child: Child) => {
        this.child = child;
        this.dateOfBirthPickerValue = fromEnGbBStringToDate(child.dateOfBirth);
        this.queryErrorMessage = null;
      },
      (error: Error) => this.errorHandler(error)
    );
  }

  public submit(child: Child): void {
    child.dateOfBirth = fromDateToEnGBString(this.dateOfBirthPickerValue);

    const submitChild: Observable<number> = this.isViewPageAction() ? this.update(child) : this.add(child);

    submitChild.subscribe(
      (childId: number) => {
        this.childForm.reset();
        this.getChildById(childId);
      },
      (error: Error) => this.errorHandler(error)
    );
  }

  public update(child: Child): Observable<number> {
    return this.childService.updateChild(child).map(() => child.id);
  }

  public add(child: Child): Observable<number> {
    return this.childService.addChild(child).map((addedChild: AddedChild) => addedChild.id);
  }

  public goToChildrenPage(): void {
    this.router.navigate(["/child/all"]);
  }

  public isViewPageAction(): boolean {
    return this.pageAction === ChildDetailPageAction.VIEW;
  }

  private initViewChildPage(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => this.getChildById(parseInt(params.get("id"), 10))
    );
  }

  private initAddChildPage(): void {
    this.child = {id: undefined, firstName: "", surname: "", dateOfBirth: ""};
  }

  private errorHandler(error: Error): void {
    this.child = null;
    this.queryErrorMessage = error.message;
  }
}
