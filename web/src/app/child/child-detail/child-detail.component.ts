import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, ParamMap, Data } from "@angular/router";
import { NgForm } from "@angular/forms";
import { fromDateToEnGBString, fromEnGbBStringToDate } from "../../shared/date";
import { defaultDatePickerConfig } from "../../ngx-bootstrap";
import { Child, ChildService, AddedChild } from "../domain";
import { ChildDetailPageAction } from "./child-detail-page-action";
import { ConfirmationDialogService } from "../../shared/confirmation-dialog";

@Component({
  templateUrl: "./child-detail.component.html"
})
export class ChildDetailComponent implements OnInit {
  public child: Child;
  public queryErrorMessage: string;
  public dateOfBirthPickerValue: Date;
  public datePickerConfig: object = defaultDatePickerConfig;
  public isItViewChildPage: boolean;

  @ViewChild(NgForm)
  public childForm: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private childService: ChildService,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  public ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.isItViewChildPage = data["pageAction"] === ChildDetailPageAction.VIEW;
      this.isItViewChildPage ? this.initViewChildPage() : this.initAddChildPage();
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
    this.isItViewChildPage ? this.update(child) : this.add(child);
  }

  public update(child: Child): void {
    this.childService.updateChild(child).subscribe(
      () => {
        this.childForm.reset();
        this.getChildById(child.id);
      },
      (error: Error) => this.errorHandler(error)
    );
  }

  public add(child: Child): void {
    this.childService.addChild(child).subscribe(
      (addedChild: AddedChild) => this.router.navigate(["/child", addedChild.id]),
      (error: Error) => this.errorHandler(error)
    );
  }

  public goToChildrenPage(): void {
    this.router.navigate(["/child/all"]);
  }

  public showConfirmationDialog(): void {
    this.confirmationDialogService
      .showModal("Are you sure you want to delete this child?")
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this.deleteChild();
        }
      });
  }

  public deleteChild(): void {
    this.childService.deleteChild(this.child.id).subscribe(
      () => this.goToChildrenPage(),
      (error: Error) => this.errorHandler(error)
    );
  }

  private initViewChildPage(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => this.getChildById(parseInt(params.get("id"), 10))
    );
  }

  private initAddChildPage(): void {
    this.child = {id: undefined, firstName: "", surname: "", dateOfBirth: "", attendance: {id: undefined}};
  }

  private errorHandler(error: Error): void {
    this.child = null;
    this.queryErrorMessage = error.message;
  }
}
