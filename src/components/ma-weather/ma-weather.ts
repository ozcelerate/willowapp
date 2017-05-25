import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ModalController, NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MaWeatherDetailsPage } from './ma-weather-details';
import { DarkSkyResponse, Currently, DailyData } from './dark-sky-response.model';
import { MaWeatherConfig } from './ma-weather.config';

@Component({
  selector: 'ma-weather',
  templateUrl: 'ma-weather.html',
  host: {
    'class': 'ma-weather-container'
  },
  providers: [Geolocation]
})
export class MaWeatherController implements OnInit {

  private _color: string;
  private config: MaWeatherConfig = new MaWeatherConfig();
  private forecast: DarkSkyResponse;

  public contentOptions: DailyData | any = {};
  public weatherLoaded: boolean = false;
  public locationLoaded: boolean = false;
  public error: { status?: boolean, message?: string} = {};

  
  constructor(private http: Http, private geo: Geolocation, private modalCtrl: ModalController, private navCtrl: NavController) {
    
  }

  @Input() 
  set maColor(val: string) {
    this._color = val;
  }
  @Input() spinnerColor: string = 'light';
  @Input() detailsType: string = 'page'; // 'page' or 'modal'
  @Input() openDetailsOnClick: boolean = true;

  ngOnInit() {
    this.loadData();
  }

  /**
   * @description This method wraps other methods to gether and can be used to refresh the data.
   */
  public loadData(): void {
    this.locationLoaded = false;
    this.weatherLoaded = false;
    this.error.status = false;
    this.getUserLocation()
    .then((res) => {
      let location;
      this.getAddress(res.coords.latitude, res.coords.longitude)
      .then((res) => {
        this.contentOptions.locationName = res;
        location = res;
      });
      this.loadWeather(res.coords.latitude, res.coords.longitude)
      .then((res) => {
        let result = res.daily.data[0];
        result.dateName = this.getReadableDate();
        result.locationName = location;
        this.contentOptions = result;
        this.forecast = res;
      });
    });
  }



  /**
   * @description Opens detailed Modal or Page depending on {this.details}
   */
  public onClickComponent(): void {
    if (this.weatherLoaded && this.locationLoaded && this.openDetailsOnClick) {
      let options = {forecast: this.forecast, type: this.detailsType, currentWeather: this.contentOptions, color: this._color};
      if (this.detailsType === 'modal') {
        let modal = this.modalCtrl.create(MaWeatherDetailsPage, options);
        modal.present();
      } else if (this.detailsType === 'page') {
        this.navCtrl.push(MaWeatherDetailsPage, options);
      }
    }
  }


  /**
   * @description Get user's current location using Cordova Geolocation Plugin
   */
  public getUserLocation(): Promise<any> {
    return new Promise((resolve) => {
      this.geo.getCurrentPosition()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        this.handleError('getUserLocation', err);
      });
    });
  }


  /**
   * @description Calls DarkSky API to get weather details for given coordinates
   * 
   * @param latitude
   * @param longitude 
   */
  public loadWeather(latitude: number, longitude: number): Promise<DarkSkyResponse> {
    return new Promise((resolve) => {
      if (this.config.darkSkyUrl !== '') {
        let url = this.config.darkSkyUrl + latitude + ',' + longitude;
        this.http.get(url).map(res => res.json()).subscribe(
          (res: DarkSkyResponse) => {
            this.weatherLoaded = true;
            resolve(res);
          },
          (err) => {
            this.handleError('loadWeather', err);
          }
        )
      } else {
        this.config.loadDarkSkyKey().then(() => {
          this.loadWeather(latitude, longitude).then(result => {
            resolve(result);
          })
        });
      }
    })
  }

  /**
   * @description Calls Google Map Geo Reverse API to get Address for given coordinates
   * 
   * @param latitude 
   * @param longitude 
   */
  private getAddress(latitude: string, longitude: string): Promise<any> {
    return new Promise((resolve) => {
      if (this.config.googleUrl !== '') {
        let url = this.config.googleUrl + latitude + ',' + longitude;
        this.http.get(url).map(res => res.json()).subscribe(
          (res) => {
            this.locationLoaded = true;
            let address  = res.results[0].formatted_address;
            resolve(address);
          },
          (err) => {
            this.handleError('getAddress', err);
          }
        )
      } else {
        this.config.loadGoogleKey().then(() => {
          this.getAddress(latitude, longitude).then((address) => {
            resolve(address)
          })
        });
      }
    })
  }

  /**
   * @description Error Handler
   * 
   * @param type - type of the error shows in which stage error happened. Based on this we show readable error message;
   * @param err  - error object
   */
  private handleError(type: string, err: any): void {
    this.error.status = true;
    this.error.message = this.config.readableMessages(type);
    console.log(err);
  }


  private getReadableDate(): string {
    let d = new Date();
    return `Today, ${this.config.monthsName[d.getMonth()]} ${d.getDay()}`;
  }
}
