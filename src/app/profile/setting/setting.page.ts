import { Component, OnInit,} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async cancelCreate() {
    this.router.navigate(['/home/profile']);
  }

  async logout() {
    await this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }
}
