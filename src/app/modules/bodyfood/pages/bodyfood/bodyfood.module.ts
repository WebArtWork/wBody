import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BodyfoodComponent } from './bodyfood.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: BodyfoodComponent
	},
	{
		path: ':body_id',
		component: BodyfoodComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [BodyfoodComponent],
	providers: []
})
export class BodyfoodModule {}
