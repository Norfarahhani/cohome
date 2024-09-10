import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [HeaderComponent, MenuComponent, LayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [HeaderComponent, MenuComponent, LayoutComponent]
})
export class ComponentsModule { }
