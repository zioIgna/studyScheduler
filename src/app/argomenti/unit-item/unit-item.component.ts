import { Component, OnInit, Input } from '@angular/core';
import { UnitComponent } from 'src/app/unit/unit.component';

@Component({
  selector: 'app-unit-item',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.scss'],
})
export class UnitItemComponent implements OnInit {

  @Input() unitItem: UnitComponent;

  constructor() { }

  onArchive(unitItemId: string) {
    console.log("Archiving unit", this.unitItem.title);
  }

  ngOnInit() { }

}
