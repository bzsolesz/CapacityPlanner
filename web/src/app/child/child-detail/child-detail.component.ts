import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Child } from '../domain/child';
import { ChildService } from '../domain/child.service';

@Component({
  templateUrl: './child-detail.component.html'
})
export class ChildDetailComponent implements OnInit {

  child: Child;
  queryErrorMessage: string;

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
        this.child = child
        this.queryErrorMessage = null;
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

  save(): void {
    
  }
}