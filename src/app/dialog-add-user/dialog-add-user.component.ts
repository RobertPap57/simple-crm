import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {
  query,
  orderBy,
  limit,
  where,
  Firestore,
  collection,
  doc,
  getDoc,
  docData,
  collectionData,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatDatepickerModule,
    MatProgressBarModule,


  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;
  public firestore = inject(Firestore);
  private dialogRef = inject(MatDialogRef<DialogAddUserComponent>);


  saveUser(): void {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.user);
    addDoc(collection(this.firestore, 'users'), this.user.toJson()).then(async (result: any) => {
      console.log(result.id);
      const userDoc = doc(this.firestore, 'users', result.id);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        console.log('Document data:', userSnapshot.data());
        this.loading = false;
        this.dialogRef.close();
      } else {
        console.log('No such document!');
      }

    });
  }


}