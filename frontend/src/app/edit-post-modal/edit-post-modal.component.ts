import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.css'],
})
export class EditPostModalComponent implements OnInit {
  editIcon = faEdit;
  editPostForm!: NgForm;

  @Input() post: any = {};
  @Output('onEditPost') onEditPost: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  onClick(form: NgForm) {
    this.editPostForm = form;
    this.onEditPost.emit();
  }
}
