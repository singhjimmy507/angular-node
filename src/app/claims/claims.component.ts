import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  constructor() { }
  foods: Food[] = [
    {value: 'Fire-0', viewValue: 'Fire'},
    {value: 'Flooding-1', viewValue: 'Flooding'},
    {value: 'General-2', viewValue: 'General'}
  ];

  ngOnInit() {
  }
}
export interface Food {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select
 */

