import { Component } from '@angular/core';
import { UserService } from './Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tera-task';
  constructor(private userService: UserService, private router: Router) { }

  public get isLoggedIn(): boolean {
    return this.userService.isAuthenticatedUser();
  }

  logout(): void {
     this.userService.logout();
     this.router.navigateByUrl('login');
  }
}