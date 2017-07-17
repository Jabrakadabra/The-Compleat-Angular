import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames]),
        'email': new FormControl(null, Validators.required, this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    this.signupForm.valueChanges.subscribe(
      (value) => console.log(value)
    );
    this.signupForm.patchValue({
      'userData': {
        'username': 'Jordan'
      }
    });
  }

  onSubmit() {
    console.log('test', this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames = (control: FormControl): { [s: string]: boolean } => {
    if (this.forbiddenUserNames.includes(control.value)) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails = (control: FormControl): Promise<any> | Observable<any> => {
    const promise = new Promise<any>((res, rej) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          res({'emailIsForbidden': true});
        } else {
          res(null);
        }
      }, 1500);
    });
    return promise;
  }
}
