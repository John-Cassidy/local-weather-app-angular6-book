import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICurrentWeather } from '../interfaces';
import { map } from 'rxjs/operators';

interface ICurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}

export interface IWeatherService {
  getCurrentWeather(
    search: string | number,
    country: string
  ): Observable<ICurrentWeather>;
  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather>;
}
@Injectable({
  providedIn: 'root',
})
export class WeatherService implements IWeatherService {
  currentWeather = new BehaviorSubject<ICurrentWeather>({
    city: '--',
    country: '--',
    date: Date.now(),
    image: '',
    temperature: 0,
    description: '',
  });

  constructor(private httpClient: HttpClient) {}

  getCurrentWeather(
    search: string | number,
    country?: string
  ): Observable<ICurrentWeather> {
    let uriParams = '';
    if (!isNaN(Number(search))) {
      search = Number(search);
    }
    if (typeof search === 'string') {
      uriParams = `q=${search}`;
    } else {
      uriParams = `zip=${search}`;
    }
    if (country) {
      uriParams = `${uriParams},${country}`;
    }
    return this.getCurrentWeatherHelper(uriParams);
  }
  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather> {
    const uriParams = `lat=${coords.latitude}&lon=${coords.longitude}`;
    return this.getCurrentWeatherHelper(uriParams);
  }
  private getCurrentWeatherHelper(
    uriParams: string
  ): Observable<ICurrentWeather> {
    let url =
      `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
      `${uriParams}&appid=${environment.appId}`;
    return this.httpClient
      .get<ICurrentWeatherData>(url)
      .pipe(map((data) => this.tranformToICurrentWeather(data)));
  }
  private tranformToICurrentWeather(
    data: ICurrentWeatherData
  ): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    };
  }
  convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67;
  }
}
