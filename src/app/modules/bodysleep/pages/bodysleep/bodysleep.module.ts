import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BodysleepComponent } from './bodysleep.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: BodysleepComponent
	},
	{
		path: ':body_id',
		component: BodysleepComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [BodysleepComponent],
	providers: []
})
export class BodysleepModule {}
