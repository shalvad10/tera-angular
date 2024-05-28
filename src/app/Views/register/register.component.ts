import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Role } from '../../Services/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm!: FormGroup;
  roles: Role[] = [
    { value: 'admin', viewValue: 'Admin'},
    { value: 'user', viewValue: 'User'}
  ];
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor( private formBuilder: FormBuilder, private router: Router, private userService: UserService ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, [Validators.required]],
      role: [null, [Validators.required]]
    });
  }

  submit() {
    if (!this.registerForm.valid) {
      return;
    }
    console.log(this.registerForm.value)
    this.userService.register(this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.role).subscribe((dt: any) => {
      if(dt.status == 200) {
        alert('რეგისტრაცია წარმატებით დასრულდა');
        this.router.navigateByUrl('login');
      }
    })
  }
}
