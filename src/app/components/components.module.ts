import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HeaderComponent, SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [HeaderComponent, SearchComponent]
})
export class ComponentsModule { }
