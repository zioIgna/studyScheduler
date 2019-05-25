import { Component, OnInit } from '@angular/core';
import { UnitComponent } from '../unit/unit.component';

@Component({
  selector: 'app-argomenti',
  templateUrl: './argomenti.page.html',
  styleUrls: ['./argomenti.page.scss'],
})
export class ArgomentiPage implements OnInit {
  private unitList: UnitComponent[] = [
    {
      title: 'prima unita',
      chapterFrom: 'capitolo 1.1',
      chapterTo: 'capitolo 1.2',
      appuntamenti: [
        new Date("2019-05-12"),
        new Date('2019-05-13'),
        new Date('2019-05-16'),
        new Date('2019-05-23')
      ]
    },
    {
      title: 'seconda unita',
      chapterFrom: 'capitolo 1.3',
      chapterTo: 'capitolo 1.5',
      appuntamenti: [
        new Date("2019-05-14"),
        new Date('2019-05-15'),
        new Date('2019-05-18'),
        new Date('2019-05-25')
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
