import { NgModule } from '@angular/core';
import { BodiesComponent } from './bodies.component';
import { Routes, RouterModule } from '@angular/router';
import { BodieComponent } from './bodie/bodie.component';
import { CoreModule } from 'src/app/core/core.module';


const routes: Routes = [
  {
   path: '',
   component: BodiesComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes), CoreModule],
  declarations: [BodiesComponent, BodieComponent]
 })
export class BodiesModule { }
