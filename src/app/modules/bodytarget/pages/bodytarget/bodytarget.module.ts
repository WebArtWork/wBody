import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BodytargetComponent } from './bodytarget.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: BodytargetComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [BodytargetComponent],
	providers: []
})
export class BodytargetModule {}
