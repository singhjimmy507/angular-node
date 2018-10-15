import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    enteredValue = '';
    newPost = ''; // Property of class. Doesn't require const, var, let

    onAddPost(form: NgForm) {
        // alert('Post added');
        console.log(form.value.location);
        console.log(form.value.first_name);
        console.log(form.value.last_name);
        this.newPost = this.enteredValue;
    }
}
