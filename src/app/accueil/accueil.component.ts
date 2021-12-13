import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgModule } from '@angular/core';
import { style } from '@angular/animations';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as moment from 'moment';
import { EditPostModalComponent } from '../edit-post-modal/edit-post-modal.component';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})



export class AccueilComponent implements OnInit {
  @ViewChild('editPostModal') editPostModalComponent! :EditPostModalComponent;
  editIcon = faEdit;
  deleteIcon = faTimes;
  commentIsMine: boolean = false;
  postIsMine: boolean = false;
  posts : any = [];
  comments : any = [];
  user : any = [];
  commentEditModalBody: any = [];
  commentDeleteModalBody: any = [];
  url: string = "https://angular.io/api/router/RouterLink";
  urlSafe: SafeResourceUrl = "";
  editedPost :any = [];
  
  constructor(private httpClient: HttpClient,private router: Router, private route: ActivatedRoute, public sanitizer: DomSanitizer) { }
  
  parameters = new HttpParams().set('email', localStorage.email);
  //définit un paramêtre de requète pour la requête GET (ici l'email)

  FrenchFormat(date:any) {
    moment.locale('fr');
    date = moment(date).format('LLL')
    return(date);
  }

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
        delete this.user["password"];
        localStorage.user=JSON.stringify(this.user);

        for (let i in this.posts){
          this.posts[i].comments = [];

          this.posts[i].video_url_safe = this.sanitizer.bypassSecurityTrustResourceUrl(this.posts[i].video_url); //permet d'utiliser les url des vidéos

          if(this.posts[i].user_id == this.user.email) {
            this.posts[i].postIsMine = true; //on définit pour chaque post s'il appartient à l'utilisateur
          };

          for(let j in this.comments){
            if (this.comments[j].post_id == this.posts[i].post_id){
              this.posts[i].comments.push(this.comments[j])//ce code ajoute les commentaires j dans un sous tableau de leurs posts i respectifs.
            }
          }

          for (let k in this.posts[i].comments) {
            if (this.posts[i].comments[k].user_id == this.user.email) {
              this.posts[i].comments[k].commentIsMine = true;
            } 
          }

        }
        console.log("Posts traités :",this.posts);
      },
      (error) => {
        console.log('erreur : ' + error.message);
      }
    )
  }

  onSubmitComment(form: NgForm, i:number){
    console.log(form.value);
    var commentForm = {
        email:this.user.email,
        post_id: parseInt(form.value.post_id),
        textcontent:form.value.comment
      };
    console.log(commentForm);
    let headers = new HttpHeaders().set('Authorization', localStorage.jwt_token);
    this.httpClient.post('http://localhost:3000/accueil', commentForm, {headers})
    .subscribe(
      (response: any) =>{
        console.log("commentaire ajouté");
        let myComment = {
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          textcontent: commentForm.textcontent
        }
        console.log(this.posts[i].comments);
        this.posts[i].comments.push(myComment);
        // location.reload();
      },(error) => {
        console.log("Erreur : " + error.message);
      }
    )
  }

  onEditComment(form: NgForm, i:number, j:number){
    var editCommentForm = {
      textcontent: form.value.editedComment,
      creation_date: form.value.creation_date
    };
    console.log(form.value);
    let headers = new HttpHeaders().set('Authorization', localStorage.jwt_token);
    this.httpClient.put('http://localhost:3000/accueil', editCommentForm, {headers})
    .subscribe(
      (response:any) => {
        this.posts[i].comments[j].textcontent = editCommentForm.textcontent;
        this.closeModal('editedCommentModal');
        console.log("commentaire édité");
      }, (error) => {
        console.log("Erreur : " + error.message);
      }
    )
  };

  onDeleteComment(form: NgForm,i:number,j:number){
    let url = 'http://localhost:3000/accueil?postId={0}&creation_date={1}';
    url = url.replace('{0}', form.value.post_id).replace('{1}', form.value.creation_date);
    let headers = new HttpHeaders().set('Authorization', localStorage.jwt_token);
    this.httpClient.request('delete', url, {headers:headers} )
    .subscribe(
      (response:any) => {
        console.log("commentaire supprimé :", this.posts[i].comments[j]);
        this.posts[i].comments.splice(j,1);//supprime le commentaire de la liste des commentaires en front-end.
      }, (error) => {
        console.log("Erreur : " + error.message);
      }
    )
  };

  onEditModal(i:number,j:number){
    console.log("onEditModal: ",this.posts[i].comments[j]);
    this.commentEditModalBody.textcontent = this.posts[i].comments[j].textcontent;
    this.commentEditModalBody.post_id = this.posts[i].post_id;
    this.commentEditModalBody.creation_date = this.posts[i].comments[j].creation_date;
    this.commentEditModalBody.user_id = this.posts[i].comments[j].user_id;
    this.commentEditModalBody.post_index = i;
    this.commentEditModalBody.comment_index = j;
  }

  onDeleteModal(i:number,j:number){
    console.log("onDeleteModal: ", this.posts[i].comments[j]);
    this.commentDeleteModalBody.post_id = this.posts[i].comments[j].post_id;
    this.commentDeleteModalBody.creation_date = this.posts[i].comments[j].creation_date;
    this.commentDeleteModalBody.post_index = i;
    this.commentDeleteModalBody.comment_index = j;
  }

  closeModal(myModalId:string) {
    $('#'+myModalId).modal('hide');
  }
  
  onDeletePost(post: any){
    let url = 'http://localhost:3000/post/supprimer?postId={0}&creation_date={1}&user_id={2}';
    url = url.replace('{0}', post.post_id).replace('{1}',post.creation_date).replace('{2}',post.user_id);
    let headers = new HttpHeaders().set('Authorization', localStorage.jwt_token);
    this.httpClient.request('delete', url, {headers})
    .subscribe(
      (response:any) => {
        // alert("post supprimé : " + post.textcontent);
        this.closeModal('deletePostModal');
        let postElement = document.getElementById('post' + post.post_index);
        if(postElement){
          $(postElement).slideUp(); //fait disparaitre le commentaire de la liste des commentaires en front-end
        }
      }, (error) => {
        console.log("Erreur : " + error.message);
      }
    )
  };

  onEditPost(form : NgForm){    
    console.log(form.value)
    let headers = new HttpHeaders().set('Authorization', localStorage.jwt_token);
    this.httpClient.put('http://localhost:3000/post/editer', form.value, {headers})
    .subscribe(
      (response:any) => {
        if (response.affectedRows = 1){
          alert("post édité avec succés.");
          console.log("editedPost", this.editedPost);
          this.posts[this.editedPost.post_index].textcontent = form.value.textcontent; //remplace le texte du post en front-end
          this.posts[this.editedPost.post_index].video_url = form.value.video_url; //remplace la video du post en front-end
        }
        this.closeModal('editPostModal');
      }, (error) => {
        console.log("Erreur : " + error.message);
      }
    )
  }

  openPostModal(post:any, i:number){
    this.editedPost= post
    this.editedPost.post_index = i;
    console.log("openPostModal", this.editedPost);
  }

};