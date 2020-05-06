import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.page.html',
  styleUrls: ['./customization.page.scss'],
})
export class CustomizationPage implements OnInit {

  private deadlines: number[] = [2, 5, 7];
  private newDeadline: number;

  constructor() { }

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

  ngOnInit() {
  }

}
