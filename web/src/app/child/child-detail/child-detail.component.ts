import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { NgForm } from "@angular/forms";

import { fromDateToEnGBString, fromEnGbBStringToDate } from "../../utility";
import { defaultDatePickerConfig } from "../../ngx-bootstrap";

import { Child } from "../domain/child";
import { ChildService } from "../domain/child.service";

@Component({
  templateUrl: "./child-detail.component.html"
})
export class ChildDetailComponent implements OnInit {

  public child: Child;
  public queryErrorMessage: string;
  public dateOfBirthPickerValue: Date;
  public datePickerConfig: object = defaultDatePickerConfig;

  @ViewChild(NgForm)
  public childForm: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private childService: ChildService
  ) { }

  public ngOnInit(): void {
    let childId: string;
    this.route.paramMap.subscribe(
      (params: ParamMap) => childId = params.get("id")
    );
    this.getChildById(parseInt(childId, 10));
  }

  public getChildById(id: number): void {
    this.childService.getChildById(id).subscribe(
      (child: Child) => {
        this.child = child;
        this.dateOfBirthPickerValue = fromEnGbBStringToDate(child.dateOfBirth);
        this.queryErrorMessage = null;
      },
      (error: Error) => {
        this.child = null;
        this.queryErrorMessage = error.message;
      }
    );
  }

  public save(child: Child): void {
    child.dateOfBirth = fromDateToEnGBString(this.dateOfBirthPickerValue);
    this.childService.updateChild(child).subscribe(
      () => {
        this.childForm.reset();
        this.getChildById(child.id);
      },
      (error: Error) => {
        this.child = null;
        this.queryErrorMessage = error.message;
      }
    );
  }

  public goToChildrenPage(): void {
    this.router.navigate(["/child/all"]);
  }
}
