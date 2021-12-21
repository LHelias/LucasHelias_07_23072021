import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent implements OnInit {
  email: string = '';

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onSubmitConnexion(form: NgForm) {
    var connexionForm = [form.value.email, form.value.password];
    this.httpClient
      .post('http://localhost:3000/connexion', form.value)
      .subscribe(
        (response: any) => {
          localStorage.jwt_token = response.token;
          // console.log("Connexion OK !");
          localStorage.email = form.value.email;
          this.router.navigate([`/accueil`]);
        },
        (error) => {
          // console.log(error.error.message);
          if (error.error.message == 'error, could not find user.') {
            alert('Utilisateur inconnu !');
            document.getElementById('email')?.classList.add('is-invalid');
          } else if (error.error.message == 'mot de passe incorrect') {
            document.getElementById('password')?.classList.add('is-invalid');
          }
        }
      );
  }

  validateEmail(emailId: string) {
    var email = (<HTMLInputElement>document.getElementById(emailId)).value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      document.getElementById(emailId)?.classList.remove('is-invalid');
      return true;
    }
    document.getElementById(emailId)?.classList.add('is-invalid');
    return false;
  }
}
