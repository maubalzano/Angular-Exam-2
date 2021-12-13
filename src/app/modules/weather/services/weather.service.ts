import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CityWeather, WeatherInfo } from 'src/app/shared/models/weather.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getWeatherByCity(city: string): Observable<WeatherInfo>{

    const params = new HttpParams()
      .set('appId', environment.apiKey)
      .set('q', city)
      .set('lang', 'it')
      .set('units', 'metric')
    return this.http.get<CityWeather>( `${environment.apiUrl}weather`, { params } )
       .pipe(
         map( response => ({ 
          city: response.name, 
          country: response.sys.country, 
          temp: Math.floor(response.main.temp), 
          description: response.weather[0].description, 
          icon: response.weather[0].icon })
       ))
  }
}
