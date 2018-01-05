import { Component, OnInit } from '@angular/core';

import { Child } from '../domain/child';
import { ChildService } from '../service/child.service';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html'
})
export class ChildListComponent implements OnInit {

  children: Child[] = [];
  queryErrorMessage: string = null;

  constructor(private childService: ChildService) { }

  ngOnInit() {
    this.getAllChildren();
  }

  getAllChildren(): void {
    this.childService.getAllChildren().subscribe(
      (children) => {
        this.children = children;
        this.queryErrorMessage = null;
      },
      (error: Error) => {
        this.children = [];
        this.queryErrorMessage = error.message;
      }
    )
  }
}
