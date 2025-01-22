import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './core/theme/guest/guest.component';
import { UserComponent } from './core/theme/user/user.component';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { environment } from 'src/environments/environment';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AdminsGuard } from './core/guards/admins.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		component: GuestComponent,
		children: [
			/* guest */
			{
				path: 'components',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Components'
					}
				},
				loadChildren: () =>
					import('./pages/guest/components/components.module').then(
						(m) => m.ComponentsModule
					)
			},
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.module').then(
						(m) => m.SignModule
					)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* user */
			{
				path: 'bodytarget',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Bodytarget'
					}
				},
				loadChildren: () => import('./modules/bodytarget/pages/bodytarget/bodytarget.module').then(m => m.BodytargetModule)
			}, 
			{
				path: 'bodystress',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Bodystress'
					}
				},
				loadChildren: () => import('./modules/bodystress/pages/bodystress/bodystress.module').then(m => m.BodystressModule)
			}, 
			{
				path: 'bodyweight',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Bodyweight'
					}
				},
				loadChildren: () => import('./modules/bodyweight/pages/bodyweight/bodyweight.module').then(m => m.BodyweightModule)
			}, 
			{
				path: 'bodyfood',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Bodyfood'
					}
				},
				loadChildren: () => import('./modules/bodyfood/pages/bodyfood/bodyfood.module').then(m => m.BodyfoodModule)
			}, 
			{
				path: 'bodyexercise',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Bodyexercise'
					}
				},
				loadChildren: () => import('./modules/bodyexercise/pages/bodyexercise/bodyexercise.module').then(m => m.BodyexerciseModule)
			}, 
			{
				path: 'bodyhabit',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Bodyhabit'
					}
				},
				loadChildren: () => import('./modules/bodyhabit/pages/bodyhabit/bodyhabit.module').then(m => m.BodyhabitModule)
			}, 
			{
				path: 'bodymood',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'bodymood'
					}
				},
				loadChildren: () => import('./modules/bodymood/pages/bodymood/bodymood.module').then(m => m.BodymoodModule)
			}, 
			{
				path: 'bodysleep',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'bodysleep'
					}
				},
				loadChildren: () => import('./modules/bodysleep/pages/bodysleep/bodysleep.module').then(m => m.BodysleepModule)
			}, 
			{
				path: 'body',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Body'
					}
				},
				loadChildren: () => import('./modules/body/pages/body/body.module').then(m => m.BodyModule)
			}, 
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		component: UserComponent,
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.module').then(
						(m) => m.UsersModule
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import(
						'./modules/customform/pages/customforms/customforms.module'
					).then((m) => m.CustomformsModule)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./core/modules/translate/pages/translates/translates.module'
					).then((m) => m.TranslatesModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent],
	imports: [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: environment.meta.title,
					description: environment.meta.description,
					titleSuffix: ' | ' + environment.meta.title,
					'og:image': environment.meta.icon
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			},
			alert: {
				alerts: {
					/* alerts */
				}
			},
			loader: {
				loaders: {
					/* loaders */
				}
			},
			popup: {
				popups: {
					/* popups */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [
		/* providers */
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		AuthenticatedGuard,
		GuestGuard,
		AdminsGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
