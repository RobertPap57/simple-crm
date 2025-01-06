import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import {MatCardModule} from '@angular/material/card';
import { Firestore } from '@angular/fire/firestore';
import { collection, onSnapshot } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, RouterModule, CommonModule, MatIconModule, MatTooltipModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  position: TooltipPosition = 'above';
  public dialog = inject(MatDialog)
  public firestore = inject(Firestore)
  allUsers: any[] = [];
  unsubscribe;

   constructor()  {
    this.unsubscribe = this.subUsers();
   }

  subUsers() {
    const usersRef = collection(this.firestore, 'users');
    return onSnapshot(usersRef, (snapshot) => {
      this.allUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(this.allUsers);
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
  
  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }
}


