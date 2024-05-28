import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { Role } from '../../../Services/interfaces';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  public isEdit: boolean = false;
  public dataLoaded: boolean = false;

  editForm!: FormGroup;
  userID!: number;
  roles: Role[] = [
    { value: 'admin', viewValue: 'Admin'},
    { value: 'user', viewValue: 'User'}
  ];
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => { this.userID = params['id']; });

    this.userService.getUser(this.userID).subscribe((el: any) => {
      console.warn(el);
      this.dataLoaded = true;
      this.editForm = this.formBuilder.group({
        username: [el.data.username, [Validators.required]],
        email: [el.data.email, [Validators.required, Validators.pattern(this.emailRegx)]],
        role: [el.data.role, [Validators.required]]
      });
    });
  }

  editUser() {
    this.isEdit = !this.isEdit;
  }

  submit() {
    if (!this.editForm.valid) {
      return;
    }
    console.log(this.editForm.value);
    this.userService.updateUser(this.userID,this.editForm.value.email, this.editForm.value.username,this.editForm.value.role).subscribe((dt: any)=> {
      console.warn(dt);
      alert('მონაცემები წარმატებით განახლდა.');
      this.isEdit = false;
      this.editForm.setValue({
        username: dt.data.username,
        email: dt.data.email,
        role: dt.data.role
      });
    })
  }
}
