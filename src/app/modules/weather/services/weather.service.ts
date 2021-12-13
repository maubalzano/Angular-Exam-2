import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { CityWeather, WeatherInfo } from 'src/app/shared/models/weather.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private readonly http: HttpClient
  ) { }
  getWeatherByCoords(lon:number, lat: number){
    const params = new HttpParams()
      .set('appId', environment.apiKey)
      .set('lat', lat)
      .set('lon', lon)
    return this.http.get<any>('https://api.openweathermap.org/data/2.5/onecall', { params })
  }
  
  getCoordByCity(city: string){
    const params = new HttpParams().set('q', city);
    return this.http.get<{lon: number, lat: number}>(`https://nominatim.openstreetmap.org/search?q=${city}`)
      .pipe(
        switchMap( ({ lon, lat }) => this.getWeatherByCoords(lon, lat) )
      )
  }

  

  getWeatherByCity(city: string): Observable<WeatherInfo>{
    const params = new HttpParams()
      .set('appId', environment.apiKey)
      .set('q', city)
      .set('lang', 'it')
      .set('units', 'metric')
    return this.http.get<CityWeather>( `${environment.apiUrl}weather`, { params } )
       .pipe(
         map( response => ({ city: response.name, country: response.sys.country, temp: Math.floor(response.main.temp), description: response.weather[0].description, icon: response.weather[0].icon })
       ))
  }
}
