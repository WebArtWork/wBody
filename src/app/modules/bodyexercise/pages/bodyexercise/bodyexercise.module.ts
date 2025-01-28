import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BodyexerciseComponent } from './bodyexercise.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: BodyexerciseComponent
	},
	{
		path: ':body_id',
		component: BodyexerciseComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [BodyexerciseComponent],
	providers: []
})
export class BodyexerciseModule {}
