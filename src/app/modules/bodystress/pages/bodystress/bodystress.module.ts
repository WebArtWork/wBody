import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BodystressComponent } from './bodystress.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: BodystressComponent
	},
	{
		path: ':body_id',
		component: BodystressComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [BodystressComponent],
	providers: []
})
export class BodystressModule {}
