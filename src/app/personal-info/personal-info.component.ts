import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor() { }
  enteredValue = '';
  newPost = ''; // Property of class. Doesn't require const, var, let

  onAddPost(form: NgForm) {
      // alert('Post added');
      console.log(form.value.location);
      console.log(form.value.first_name);
      console.log(form.value.last_name);
      this.newPost = this.enteredValue;
  }
  ngOnInit() {
  }

}
