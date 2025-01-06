import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  public dialog = inject(MatDialog)
  route = inject(ActivatedRoute);
  firestore = inject(Firestore);
  userId: string = '';
  user: User = new User();

  unsubscribe;

  constructor() {
     this.getUserId();
    this.unsubscribe = this.subUser();
  }

 getUserId() {
    this.route.params.subscribe(async params => {
      this.userId = params['id'];
    })
  }

  subUser() {
    const userRef = doc(this.firestore, 'users', this.userId);
    return onSnapshot(userRef, (userSnapshot:any) => {
      if (userSnapshot.exists()) {
        this.user = new User(userSnapshot.data());
        console.log(this.user);
      } else {
        console.log('User not found');
      }
    }, (error) => {
      console.error('Error fetching user data:', error);
    });

  }

ngOnDestroy() {
  this.unsubscribe();
}



editUser() {
  const dialog = this.dialog.open(DialogEditUserComponent);
  dialog.componentInstance.user = new User(this.user);
  dialog.componentInstance.userId = this.userId;
}
editAddress() {
  const dialog = this.dialog.open(DialogEditAddressComponent);
  dialog.componentInstance.user = new User(this.user);
  dialog.componentInstance.userId = this.userId;
}











}