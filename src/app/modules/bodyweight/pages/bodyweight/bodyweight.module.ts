import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BodyweightComponent } from './bodyweight.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: BodyweightComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [BodyweightComponent],
	providers: []
})
export class BodyweightModule {}
