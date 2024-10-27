import { Component, OnInit,} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async cancelCreate() {
    this.router.navigate(['/home/profile']);
  }
}
