import { Component, OnInit } from '@angular/core';

import { Child } from '../domain/child';
import { ChildService } from '../service/child.service';

@Component({
  selector: 'app-child-detail',
  templateUrl: './child-detail.component.html',
  styleUrls: ['./child-detail.component.css']
})
export class ChildDetailComponent implements OnInit {

  child: Child;
  queryErrorMessage: string;

  constructor(private childService: ChildService) { }

  ngOnInit() {
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
}