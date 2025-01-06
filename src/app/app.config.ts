import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideAnimations(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({
    "projectId":"simple-crm-82042","appId":"1:341035180485:web:c31988e4ebd65a274babac","storageBucket":"simple-crm-82042.firebasestorage.app","apiKey":"AIzaSyAS9YOqlu90zGswlkDOyC-J9xM7XRgIZ1s","authDomain":"simple-crm-82042.firebaseapp.com","messagingSenderId":"341035180485"

  })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()),]
};
