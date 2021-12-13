import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { CityWeather, Coords, OneCallResponse, WeatherInfo } from 'src/app/shared/models/weather.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getWeatherByCoords(lon:number, lat: number, city: string, country: string): Observable<WeatherInfo>{
    const params = new HttpParams()
      .set('appId', environment.apiKey)
      .set('lat', lat)
      .set('lon', lon)
      .set('units','metric')
      .set('exlude', 'daily,hourly,minutely,alerts')
      .set('lang', 'it');
    return this.http.get<OneCallResponse>('https://api.openweathermap.org/data/2.5/onecall', { params })
        .pipe(
          map(({ current }) =>({
             temp: Math.floor(current.temp), 
             city: city,
             country: country, 
             description: current.weather[0].description, 
             icon: current.weather[0].icon}) )
        )
  }
  
  getCoordByCity(city: string): Observable<WeatherInfo>{
   
    const params = new HttpParams()
    .set('apikey', '54f0eb30-5c12-11ec-bafd-9b153672c821')
    .set('text', city)
    .set('lang', 'it');
    return this.http.get<Coords>(`https://app.geocodeapi.io/api/v1/search`, { params })
      .pipe(
        switchMap( ({ features }) => {

          const lat = features[0].geometry.coordinates[0];
          const lon = features[0].geometry.coordinates[1];
          const city = features[0].properties.name;
          const country = features[0].properties.country;
          
          return this.getWeatherByCoords(lat, lon, city, country)
        })
      )
  }

  getWeatherByCity(city: string): Observable<WeatherInfo>{
    const params = new HttpParams()
      .set('appId', environment.apiKey)
      .set('q', city)
      .set('lang', 'it')
      .set('units', 'metric');
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
