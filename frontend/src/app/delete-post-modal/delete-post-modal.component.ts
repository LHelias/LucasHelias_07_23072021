import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-post-modal',
  templateUrl: './delete-post-modal.component.html',
  styleUrls: ['./delete-post-modal.component.css'],
})
export class DeletePostModalComponent implements OnInit {
  deleteIcon = faTimes;
  editIcon = faEdit;

  @Input() post: any = {};
  @Output('onDeletePost') onDeletePost: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  onClick() {
    this.onDeletePost.emit();
  }
}
