import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

function equalVals(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value
    const val2 = control.get(controlName2)?.value
    if (val1===val2) {return null}
    return {valuesNotEqual: true}
  }
}
function validPassword(control: AbstractControl){
  const specialCharsReg = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  const upperCaseReg = /[A-Z]/
  const lowerCaseReg = /[a-z]/
  const numberReg = /\d/
  const value = control.value

  if (specialCharsReg.test(value) && upperCaseReg.test(value) && lowerCaseReg.test(value) && numberReg.test(value)){
    return null
  }
  return {doesNotContainsSpecialChar: true}
}

@Component({
  selector: 'app-sign-in.component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  form = new FormGroup({
    username: new FormControl('',{
      validators: [
        Validators.required
      ]
    }),
    passwords: new FormGroup({
      password: new FormControl('',{
        validators: [
          Validators.required,
          Validators.minLength(6),
          validPassword
          ],
      }),
      confirmPassword: new FormControl('',{
        validators: [
          Validators.required,
          Validators.minLength(6),
          ],
      }),
    }, 
    {
      validators: [equalVals('password','confirmPassword')]
    })
  })


  onSubmit(){
    console.log(this.form)
    const username = this.form.controls.username.value
    const password = this.form.controls.passwords.controls.password.value
    const cPassword = this.form.controls.passwords.controls.confirmPassword.value
    console.log(username, password, cPassword, this.form.status)
  }
  onReset(){
    this.form.reset()
  }
}
