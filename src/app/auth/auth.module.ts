import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';



@NgModule({
  declarations: [LoginPage, RegisterPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
