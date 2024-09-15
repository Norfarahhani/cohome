import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IndexPage } from './index/index.page';
import { TaskRoutingModule } from './task-routing.module';



@NgModule({
  declarations: [IndexPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskRoutingModule,
    ComponentsModule
  ]
})
export class TaskModule { }
