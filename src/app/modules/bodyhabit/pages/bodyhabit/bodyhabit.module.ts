import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BodyhabitComponent } from './bodyhabit.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: BodyhabitComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [BodyhabitComponent],
	providers: []
})
export class BodyhabitModule {}
