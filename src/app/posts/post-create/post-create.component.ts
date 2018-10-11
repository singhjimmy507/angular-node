import { Component } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
    newPost = ''; //Property of class. Doesn't require const, var, let

    onAddPost(postInput: HTMLTextAreaElement){
        // alert('Post added');
        
        this.newPost = postInput.value;
    }
}