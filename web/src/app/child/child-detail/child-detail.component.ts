import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms'

import { fromDateToEnGBString, fromEnGbBStringToDate } from "../../utility";
import { defaultDatePickerConfig } from "../../ngx-bootstrap";

import { Child } from '../domain/child';
import { ChildService } from '../domain/child.service';

@Component({
  templateUrl: './child-detail.component.html'
})
export class ChildDetailComponent implements OnInit {

  child: Child;
  queryErrorMessage: string;
  dateOfBirthPickerValue: Date;
  datePickerConfig = defaultDatePickerConfig;

  @ViewChild(NgForm)
  childForm: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private childService: ChildService
  ) { }

  ngOnInit() {
    let childId: string;
    this.route.paramMap.subscribe(
      params => {childId = params.get("id");}
    );
    this.getChildById(parseInt(childId));
  }

  getChildById(id: number): void {
    this.childService.getChildById(id).subscribe(
      child => {
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

  save(child: Child): void {
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

  goToChildrenPage(): void {
    this.router.navigate(["/child/all"]);
  }
}