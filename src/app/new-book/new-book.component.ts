import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss'],
})
export class NewBookComponent implements OnInit {

  constructor(private managementSrv: ManagementService) { }

  onCreateBook(form: NgForm){
    this.managementSrv.addBook(form);
  }

  ngOnInit() {}

}
