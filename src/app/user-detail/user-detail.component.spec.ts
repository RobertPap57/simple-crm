import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';





describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent, ],
      providers: [provideRouter([]), provideFirebaseApp(() => initializeApp({
     "projectId":"simple-crm-82042","appId":"1:341035180485:web:c31988e4ebd65a274babac","storageBucket":"simple-crm-82042.firebasestorage.app","apiKey":"AIzaSyAS9YOqlu90zGswlkDOyC-J9xM7XRgIZ1s","authDomain":"simple-crm-82042.firebaseapp.com","messagingSenderId":"341035180485"
      })),
      provideFirestore(() => getFirestore()),],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


