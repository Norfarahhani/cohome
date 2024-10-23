import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
  }

  async onLogin() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('User signed in:', userCredential.user);
      this.router.navigate(['/home']); // Navigate to home after successful login
    } catch (error) {
      console.error('Error signing in:', error);
      // You can also show an error message to the user here
    }
  }

}
