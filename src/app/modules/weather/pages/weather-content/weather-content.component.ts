import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { WeatherInfo } from 'src/app/shared/models/weather.model';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-content',
  templateUrl: './weather-content.component.html',
  styleUrls: ['./weather-content.component.scss']
})
export class WeatherContentComponent implements OnInit {

  public cityInput = new FormControl('Milano', Validators.required);

  public cityWeather$!: Observable<WeatherInfo>;
  public date!: Date;

  constructor(
    private readonly weatherService: WeatherService
  ) { }

  searchByCity(){

    this.cityWeather$ = this.cityInput.valid ? this.weatherService.getCoordByCity(this.cityInput.value) : this.cityWeather$;
    
    this.date = new Date()

  }

  ngOnInit(): void {
  }

}
