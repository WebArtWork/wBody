import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MyprofileComponent } from './myprofile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

	{
		path: ':myprofile_id',
		component: MyprofileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MyprofileComponent]
})
export class MyprofileModule {
	
}
