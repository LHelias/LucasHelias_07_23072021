import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nouveau-post',
  templateUrl: './nouveau-post.component.html',
  styleUrls: ['./nouveau-post.component.css']
})
export class NouveauPostComponent implements OnInit {
  
  commentIsMine: boolean = false;
  posts : any = [];
  comments : any = [];
  user : any = [];
  commentEditModalBody: any = [];
  commentDeleteModalBody: any = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.user);
    console.log(this.user);
  }

  onNewPost(form:NgForm){
    console.log(form.value);
    let url = "http://localhost:3000/post/nouveau"
    let headers = new HttpHeaders().set('Authorization', localStorage.jwt_token);

    this.httpClient.post(url, [this.user.email, form.value.textcontent,form.value.video_url], {headers})
    .subscribe(
      (response:any) => {
        console.log("response : ", response);
      }, (error) => {
        console.log("Erreur : " + error.message);
      }
    )
  };

}
