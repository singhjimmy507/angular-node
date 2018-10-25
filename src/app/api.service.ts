import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ApiService {

  apiUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {}

  postForm(data: any) {
    this.http.post(this.apiUrl, data)
      .subscribe(resp => {
        console.log('Form submitted!');
      });
  }
}
