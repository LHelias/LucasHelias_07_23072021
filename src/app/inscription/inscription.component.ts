import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event, Router } from '@angular/router';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  profilePicture!: File;
  formData!: FormData;
  url:any = '';

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event:any){
    this.profilePicture = <File>event.target.files[0];
    console.log(event.target.files[0]);

    if(event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target?.result
      }
    }
  };

  onSubmitInscription(form: NgForm){
    // console.log("form.value", form.value);
    if (form.value.password === form.value.passwordConfirmation) {
      console.log("OK");
      

      this.formData= new FormData;
      console.log(this.profilePicture);
      console.log(this.formData);
      this.formData.append('profilePicture', this.profilePicture, this.profilePicture.name);
      

      const formValuesJSON= JSON.stringify(form.value)

      // this.formData.append('formValues', formValuesBlob);
      console.log("form.value: ",form.value);

      this.formData.append("email", form.value.email)
      this.formData.append("firstname", form.value.firstname)
      this.formData.append("lastname", form.value.lastname)
      this.formData.append("password", form.value.password)


      this.httpClient.post('http://localhost:3000/inscription', this.formData)
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
