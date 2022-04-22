import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isLoggedIn: boolean;
  avatar: string;
  userName: string;
  nombreEmpresa: string;
  showHome = true;
  expandCollapseStatus: string = null;
  selectedData: any = null;

  constructor() {}

  ngOnInit() {
    this.isLoggedIn =true;
  }
}
