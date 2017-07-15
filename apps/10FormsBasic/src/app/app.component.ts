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

  @ViewChild('myForm') cjbForm: NgForm;

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  onSubmit() {
    console.log('submitted', this.cjbForm);
    console.log('user', this.username);
  }
}
