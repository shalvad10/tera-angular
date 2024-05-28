import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../Services/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {

  displayedColumns: string[] = ['id','username', 'email', 'role'];
  dataSource!: User[];

  constructor(private cdRef: ChangeDetectorRef, private userService: UserService, private route: ActivatedRoute, private router: Router) {

    userService.getUsers().subscribe((dt: any) => {
      this.dataSource = dt.data;
      cdRef.markForCheck();
    });
  }

  onClick(id: any): void {
    this.router.navigate(['user', id], {relativeTo:this.route});
  }


}
