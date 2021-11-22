import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  email: string = "";

  constructor(private httpClient: HttpClient, private router: Router) { }

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
        localStorage.email = form.value.email;
        this.router.navigate([`/accueil`]);
      },
      (error) => {
        console.log("Erreur : " + error.message);
      }
    );
  };

  

};
