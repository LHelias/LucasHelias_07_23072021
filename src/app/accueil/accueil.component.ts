import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  posts : any = [];
  comments : any = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    let headers = new HttpHeaders().set('Authorization', localStorage.jwt_token)
    this.httpClient.get<any[]>('http://localhost:3000/accueil', { headers })
    .subscribe(
      (response) => {
        this.posts = response[0];
        this.comments = response[1];

        for (let i in this.posts){
          this.posts[i].comments = [];
          for(let j in this.comments){
            if (this.comments[j].post_id == this.posts[i].post_id){
              this.posts[i].comments.push(this.comments[j])
            }
          }
        }
        console.log(this.posts);
      },
      (error) => {
        console.log('erreur : ' + error);
      }
    )
  }

}
