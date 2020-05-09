import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.page.html',
  styleUrls: ['./customization.page.scss'],
})
export class CustomizationPage implements OnInit {

  private actualDeadlines: number[] = [2, 5, 7];
  private updDeadlines: number[];
  private deadlines: number[];
  private newDeadline: number;
  private editMode = false;

  constructor() { }

  onSwitchEdit() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.deadlines = this.updDeadlines;
    } else {
      this.deadlines = this.actualDeadlines;
      this.updDeadlines = [...this.actualDeadlines];
      this.newDeadline = null;
    }
  }

  onAddDeadline() {
    if (this.newDeadline) {
      this.deadlines.push(this.newDeadline);
      this.newDeadline = null;
    }
  }

  onDeleteDeadline() {
    this.deadlines.pop();
  }

  onSubDay() {
    if (this.deadlines[0]) {
      this.deadlines[0]--;
    }
  }

  onAddDay() {
    if (this.deadlines[0] != undefined) {
      this.deadlines[0]++;
    }
  }

  onSave() {
    this.actualDeadlines = [...this.updDeadlines];
    this.editMode = false;
    this.newDeadline = null;
  }

  getVal(index: number) {
    let currArray;
    // if(this.editMode){
    //   currArray = 
    // }
    currArray = this.deadlines.slice(0, index + 1);
    return currArray.reduce((total, n) => total + n, 0);
  }

  ngOnInit() {
    this.updDeadlines = [...this.actualDeadlines];
    this.deadlines = this.actualDeadlines;
  }

}
