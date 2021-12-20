import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.css']
})
export class EditPostModalComponent implements OnInit {
  editIcon = faEdit;
  editPostForm!:NgForm;

  @Input() post : any = {};
  @Output("onEditPost") onEditPost: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
  }

  // onEditPost(form : NgForm){
  //   console.log(form.value);
    
  //   let headers = new HttpHeaders().set('Authorization', localStorage.jwt_token);
  //   this.httpClient.put('http://localhost:3000/post/editer', form.value, {headers})
  //   .subscribe(
  //     (response:any) => {
  //       console.log(response);
  //       if (response.affectedRows = 1){
  //         alert("post édité avec succés.");
  //       }

  //     }, (error) => {
  //       console.log("Erreur : " + error.message);
  //     }
  //   )
  // }

  onClick(form: NgForm){
    this.editPostForm = form;
    this.onEditPost.emit();
  }
}
