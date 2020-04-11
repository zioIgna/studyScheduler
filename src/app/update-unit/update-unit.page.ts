import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManagementService } from '../management.service';
import { UnitComponent } from '../unit/unit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../Book';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-unit',
  templateUrl: './update-unit.page.html',
  styleUrls: ['./update-unit.page.scss'],
})
export class UpdateUnitPage implements OnInit, OnDestroy {

  unit: UnitComponent;
  unitId: string;

  private _books: Book[];
  private booksSub: Subscription;

  constructor(private managementSrv: ManagementService, private route: ActivatedRoute, private router: Router) { }

  onEditUnit(form: NgForm) {
    this.managementSrv.editUnit(form, this.unitId).subscribe(res => {
      console.log("Allo edit della untià ho ottenuto: ", res);
      this.router.navigate(['/navigation/tabs/args', this.unitId]);
    });
  }

  ngOnInit() {
    this.unitId = this.route.snapshot.params['unitId'];
    console.log('unitId: ', this.unitId);
    this.managementSrv.getUnitById(this.unitId).subscribe(myUnit => {
      this.unit = myUnit;
    });
    this.managementSrv.fetchBooks().subscribe(res => {
      this._books = res;
    });
    this.booksSub = this.managementSrv.books.subscribe(res => {
      this._books = res;
    })
  }

  ngOnDestroy(): void {
    if (this.booksSub) {
      this.booksSub.unsubscribe();
    }
  }

}
