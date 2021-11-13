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
        //la réponse de la première requète est la liste des posts
        this.comments = response[1];
        //la réponse de la deuxième requète est la liste des commentaires.
        for (let i in this.posts){
          this.posts[i].comments = [];
          let date = new Date(this.posts[i].creation_date);
          this.posts[i].creation_date = date.toLocaleString("fr-FR",
          {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric', 
            day: 'numeric',
            hour: 'numeric', 
            minute: 'numeric',
            hour12: false,
          })
          
          for(let j in this.comments){
            if (this.comments[j].post_id == this.posts[i].post_id){
              this.posts[i].comments.push(this.comments[j])
            }
          }
        }
        //ce code ajoute les commentaires j dans un sous tableau de leurs posts i respectifs.
        console.log(this.posts);
      },
      (error) => {
        console.log('erreur : ' + error);
      }
    )
  }

}
