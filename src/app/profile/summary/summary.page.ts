import { Component, OnInit,} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-profile-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async cancelCreate() {
    this.router.navigate(['/home/profile']);
  }

  async logout() {
    await this.authService.logoutUser();
    window.location.reload();
  }
}
