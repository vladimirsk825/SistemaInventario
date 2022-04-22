import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oficina-dialog',
  templateUrl: './oficina-dialog.component.html',
  styleUrls: ['./oficina-dialog.component.scss']
})
export class OficinaDialogComponent implements OnInit {
  
  isEditable = true;

  constructor() { }

  ngOnInit(): void {
  }

}
