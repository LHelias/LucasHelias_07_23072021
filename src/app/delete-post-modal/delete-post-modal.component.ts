import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Component, OnInit, Input } from '@angular/core';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-delete-post-modal',
  templateUrl: './delete-post-modal.component.html',
  styleUrls: ['./delete-post-modal.component.css']
})
export class DeletePostModalComponent implements OnInit {
  deleteIcon = faTimes;
  editIcon = faEdit;

  @Input() post : any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  
  onDeletePost(array: any){

    console.log(this.post.value);
    // let url = 'http://localhost:3000/accueil?postId={0}&creation_date={1}';
    // url = url.replace('{0}', form.value.post_id).replace('{1}', form.value.creation_date);
    // this.httpClient.request('delete', url, form.value)
    // .subscribe(
    //   (response:any) => {
    //     console.log("post supprimé :", this.post.textcontent);
    //     // this.post[i].splice(i,1);//supprime le commentaire de la liste des commentaires en front-end.
    //   }, (error) => {
    //     console.log("Erreur : " + error.message);
    //   }
    // )
  };

  
}
