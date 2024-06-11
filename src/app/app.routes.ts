import { Routes } from '@angular/router';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroComponent } from './pages/hero/hero.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
    { path: '', component: HeroesComponent },
    { path: 'new', component: FormComponent },
    { path: ':slug', component: HeroComponent },
    { path: ':slug/edit', component: FormComponent },
];
