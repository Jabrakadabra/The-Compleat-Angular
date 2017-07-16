import {Component, ElementRef, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = 'fork!';
  regExpIt = /jordan/i;
  myChoice = 'pet';
  genders = ['male', 'female', 'complicated'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }

  @ViewChild('myForm') cjbForm: NgForm;

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.cjbForm.form.patchValue({
      username: suggestedName,
      email: 'doofus@doofus.com',
      secret: 'pet'
    })
  }

  onSubmit() {
    this.user.username = this.cjbForm.value.username;
    this.user.email = this.cjbForm.value.email;
    this.user.secretQuestion = this.cjbForm.value.secret;
    this.user.answer = this.cjbForm.value['questionAnswer'];
    this.user.gender = this.cjbForm.value['gander'];
    this.cjbForm.reset({
      username: 'fork'
    });
  }
}
