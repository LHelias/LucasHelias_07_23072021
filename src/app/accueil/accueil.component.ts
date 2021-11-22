import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  posts : any = [];
  comments : any = [];
  user : any = [];

  constructor(private httpClient: HttpClient,private router: Router, private route: ActivatedRoute) { }
  
  parameters = new HttpParams().set('email', localStorage.email);
  //définit un paramêtre de requète pour la requête GET (ici l'email)
  

  ngOnInit(): void {
    let headers = new HttpHeaders().set('Authorization', localStorage.jwt_token);
    this.httpClient.get<any[]>('http://localhost:3000/accueil',{ headers, 'params': this.parameters })
    .subscribe(
      (response) => {
        console.log("response",response);
        this.posts = response[0];
        //la réponse de la première requète est la liste des posts
        this.comments = response[1];
        //la réponse de la deuxième requète est la liste des commentaires.
        this.user = response[2][0];

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
          //on profite de cette boucle sur les posts pour formater la date des posts
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
        console.log('erreur : ' + error.message);
      }
    )
  }

  onSubmitComment(form: NgForm){
    console.log(form.value);
    var commentForm = {
        email:this.user.email,
        post_id: parseInt(form.value.post_id),
        textcontent:form.value.comment
      };
    console.log(commentForm);
    this.httpClient.post('http://localhost:3000/accueil', commentForm)
    .subscribe(
      (response: any) =>{
        console.log("commentaire ajouté");
        location.reload();
      },(error) => {
        console.log("Erreur : " + error.message);
      }
    )
  }
}
