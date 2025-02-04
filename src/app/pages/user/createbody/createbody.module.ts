import { NgModule } from '@angular/core';
import { CreatebodyComponent } from './createbody.component'; 
import { Routes, RouterModule } from '@angular/router';
import { CreatebodysComponent } from './createbodys/createbodys.component';
import { CoreModule } from 'src/app/core/core.module';


const routes: Routes = [
  {
   path: '',
   component: CreatebodyComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes), CoreModule],
  declarations: [CreatebodyComponent, CreatebodysComponent]
 })
export class CreatebodyModule { }