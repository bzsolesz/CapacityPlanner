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

  constructor(private childService: ChildService) { }

  ngOnInit() {
  	this.getChildById(10);
  }

  getChildById(id: number): void {
  	this.childService.getChildById(id).subscribe(child => this.child = child);
  }
}