import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManagementService } from '../management.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss'],
})
export class NewBookComponent implements OnInit {

  constructor(private managementSrv: ManagementService, private modalCtrl: ModalController) { }

  onCreateBook(form: NgForm) {
    this.managementSrv.addBook(form).subscribe(res => {
      console.log("Libro aggiunto", res);
    });
    this.modalCtrl.dismiss();
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() { }

}
