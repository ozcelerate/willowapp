import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-ma-weather-details',
  templateUrl: 'ma-weather-details.html'
})
export class MaWeatherDetailsPage {
  private monthsName: string[] = ['Jan', 'Feb', 'Mar', 'April' ,'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public mainSegment: string = 'details';
  public currentWeather = {};
  public hourly: any[] = [];
  public color: string;
  public currentAccordion: number = -1;

  public details: DetailsItem[] = [
    new DetailsItem('humidity', 'Humidity', '%'),
    new DetailsItem('pressure', 'Pressure', 'mbar'),
    new DetailsItem('windSpeed', 'Wind Speed', 'mi/h'),
    new DetailsItem('ozone', 'Ozone', 'DU'),
    new DetailsItem('dewPoint', 'Dew Point', '°'),
    new DetailsItem('cloudCover', 'Cloud Cover', '%'),
    new DetailsItem('visibility', 'Visibility', 'mi'),
    new DetailsItem('precipType', 'Precip Type', ''),
    new DetailsItem('precipIntensity', 'Precip Intensity', 'mm/h'),
    new DetailsItem('precipProbability', 'Precip Probability', '%'),
  ];


  constructor(public nav: NavController, private navParams: NavParams) {
    this.currentWeather = this.navParams.data.currentWeather;
    this.color = this.navParams.data.color;

    this.processHourlyData(this.navParams.data.forecast.hourly.data);
    this.processCurrentDetails();
  }

  public toggleAccordion(i): void {
    this.currentAccordion = i === this.currentAccordion ? -1 : i;
  }

  private processCurrentDetails(): void {
    this.details.map(x => {
      x.value = this.currentWeather[x.property];
    });
  }

  private processHourlyData(hourly = []): void {
    for (let i = 0; i < hourly.length; i++) {
      let eachHourly: any = {};
      eachHourly.details = [];
      eachHourly.icon = hourly[i].icon;
      eachHourly.summary = hourly[i].summary;
      eachHourly.temperature = hourly[i].temperature;
      eachHourly.date = this.formatDate(hourly[i].time);
      eachHourly.time = this.formatTime(hourly[i].time);

      if (i !== 0) eachHourly.difference = (hourly[i].temperature - hourly[i-1].temperature) > 0 ? 'up' : 'down';

      this.details.map( d => {
        eachHourly.details.push(new DetailsItem(d.property, d.text, d.unit, hourly[i][d.property]));
      });
      this.hourly.push(eachHourly);
    };
  }

  private formatDate(ms: number): string {
    let d = new Date(ms * 1000);
    return `${this.monthsName[d.getMonth()]} ${d.getDay()}`;
  }

  private formatTime(ms: number): string {
    let d = new Date(ms * 1000);
    return `${d.getHours()}:00`;
  }

}

export class DetailsItem {
  constructor(public property: string, public text: string, public unit: string, public value: string = '') {}
}