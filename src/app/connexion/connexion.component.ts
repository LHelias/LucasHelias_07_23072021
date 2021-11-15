import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmitConnexion(form: NgForm){
    console.log(form.value);
    var connexionForm = [form.value.email, form.value.password];
    console.log(connexionForm)
    this.httpClient.post('http://localhost:3000/connexion', form.value)
    .subscribe(
      (response : any) => {
        localStorage.jwt_token = response.token;
        console.log("Connexion OK !");
      },
      (error) => {
        console.log("Erreur : " + error);
      }
    );

  };


};
