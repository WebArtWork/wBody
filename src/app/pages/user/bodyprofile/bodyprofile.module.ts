import { NgModule } from '@angular/core';
import { BodyprofileComponent } from './bodyprofile.component'; 
import { Routes, RouterModule } from '@angular/router';
import { BodyprofilesComponent } from './bodyprofiles/bodyprofiles.component';
import { CoreModule } from 'src/app/core/core.module';



const routes: Routes = [
  {
   path: '',
   component: BodyprofileComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes), CoreModule],
  declarations: [BodyprofileComponent, BodyprofilesComponent]
 })
export class BodyprofilesModule { }
