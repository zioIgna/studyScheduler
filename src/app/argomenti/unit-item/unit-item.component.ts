import { Component, OnInit, Input } from '@angular/core';
import { UnitComponent } from 'src/app/unit/unit.component';
import { ManagementService } from 'src/app/management.service';
import { UnitsData } from 'src/app/units-data';

@Component({
  selector: 'app-unit-item',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.scss'],
})
export class UnitItemComponent implements OnInit {

  @Input() unitItem: UnitComponent;

  constructor(private managementSrv: ManagementService) { }

  onArchive() {
    console.log("Archiving unit", this.unitItem.title);
    if (this.unitItem.isArchived != undefined) {
      this.unitItem.isArchived = !this.unitItem.isArchived;
    } else {
      this.unitItem.isArchived = true;
    }
    this.managementSrv.updateUnit(this.unitItem).subscribe((res: UnitsData) => {
      this.unitItem = new UnitComponent(this.unitItem.id, res.title, res.libro, res.chapterFrom, res.chapterTo, new Date(res.createdOn), res.appuntamenti, res.notes, res.questions, res.isArchived);
    });
  }

  ngOnInit() { }

}
