import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitInscription(form: NgForm){
    console.log("form.value", form.value);
    if (form.value.password === form.value.passwordConfirmation) {
      console.log("OK");
      this.httpClient.post('http://localhost:3000/inscription', form.value)
      .subscribe(
        (response : any) => {
          alert(`Inscription réussie ! Votre compte est bien créé ${form.value.firstname} ${form.value.lastname}.`);
          this.router.navigate(['/connexion']);
        },
        (error) => {
          console.log(error.error.message);
        }
      );
    } else {
      alert("Erreur : Le mot de passe et la confirmation du mot de passe sont différents !")
    }
  }

}
