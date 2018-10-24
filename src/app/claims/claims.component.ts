import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent {

  dumm = '';
  constructor() { }
  claims: Claim[] = [
    {value: 'Fire-0', viewValue: 'Fire'},
    {value: 'Flooding-1', viewValue: 'Flooding'},
    {value: 'General-2', viewValue: 'General'}
  ];
  onAddClaim() {
    alert('Add new claim');
}
onAddPolicy() {
  // alert('Add new policy');
this.dumm = 'Add new policy';
}

}
export interface Claim {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select
 */

