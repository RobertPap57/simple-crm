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
  selector: 'app-dialog-edit-user',
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

  ], templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {

  user = new User();
  birthDate!: Date;
  loading = false;
  userId!: string;
  public firestore = inject(Firestore);
  private dialogRef = inject(MatDialogRef<DialogEditUserComponent>);



  async saveChanges() {
    this.loading = true;
    const userRef = doc(this.firestore, "users", this.userId);
    await updateDoc(userRef, this.user.toJson());
    this.loading = false;
    this.dialogRef.close();
  }















}
