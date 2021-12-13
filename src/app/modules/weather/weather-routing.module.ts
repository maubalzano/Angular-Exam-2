import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherContainerComponent } from './components/weather-container/weather-container.component';
import { WeatherContentComponent } from './pages/weather-content/weather-content.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {
        path: '',
        component: WeatherContainerComponent,
        children: [
            {
                path: 'dashboard', component: WeatherContentComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }