import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BodymoodComponent } from './bodymood.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: BodymoodComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [BodymoodComponent],
	providers: []
})
export class BodymoodModule {}
