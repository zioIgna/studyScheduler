import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitComponent {

  public title: string;
  public chapterFrom: string;
  public chapterTo: string;
  public appuntamenti: Date[];

  constructor() { }

}
