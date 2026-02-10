import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  })

  get usernameIsInvalid() {
    const username = this.form.controls.username
    return username.touched && username.dirty && username.invalid
  }

  get passwordIsInvalid() {
    const password = this.form.controls.password
    return password.touched && password.invalid
  }

  onSubmit() {
    console.log(this.form)
    const enteredEmail = this.form.value.username
    const enteredPassword = this.form.value.password
    console.log(enteredEmail, enteredPassword, this.form.status)
  }
}
