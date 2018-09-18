import { Component, OnInit } from "@angular/core";
import { Child, ChildService } from "../domain";

@Component({
  templateUrl: "./child-list.component.html"
})
export class ChildListComponent implements OnInit {

  public children: Child[] = [];
  public queryErrorMessage: string = null;

  constructor(private childService: ChildService) { }

  public ngOnInit(): void {
    this.getAllChildren();
  }

  public getAllChildren(): void {
    this.childService.getAllChildren().subscribe(
      (children: Child[]) => {
        this.children = children;
        this.queryErrorMessage = null;
      },
      (error: Error) => {
        this.children = [];
        this.queryErrorMessage = error.message;
      }
    );
  }
}
