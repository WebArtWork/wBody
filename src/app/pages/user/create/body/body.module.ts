import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BodyComponent } from './body.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: BodyComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [BodyComponent]
})
export class BodyModule {}
