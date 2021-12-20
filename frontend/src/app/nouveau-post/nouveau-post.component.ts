import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


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
  parameters = new HttpParams().set('email', localStorage.email);


  constructor(private httpClient: HttpClient, private router: Router) {}


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.user);
  }

  onNewPost(form:NgForm){
    console.log(form.value);
    let url = "http://localhost:3000/post/nouveau"
    let headers = new HttpHeaders().set('Authorization', localStorage.jwt_token);
    this.httpClient.post(url, [this.user.email, form.value.textcontent,form.value.video_url], {headers, 'params': this.parameters })
    .subscribe(
      (response:any) => {
        console.log("response : ", response);
        this.router.navigate([`/accueil`]);
      }, (error) => {
        console.log("Erreur : " + error.message);
      }
    )
  };

}
