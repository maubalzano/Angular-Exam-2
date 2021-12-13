import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherContainerComponent } from './components/weather-container/weather-container.component';
import { WeatherContentComponent } from './pages/weather-content/weather-content.component';
import { WeatherRoutingModule } from './weather-routing.module'
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WeatherContainerComponent,
    WeatherContentComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    ReactiveFormsModule
  ]
})
export class WeatherModule { }
