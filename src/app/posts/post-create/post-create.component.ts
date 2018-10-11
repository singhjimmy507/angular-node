import { Component } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    enteredValue = '';
    newPost = ''; //Property of class. Doesn't require const, var, let

    onAddPost(postInput: HTMLTextAreaElement){
        // alert('Post added');
        this.newPost = this.enteredValue;
    }
}