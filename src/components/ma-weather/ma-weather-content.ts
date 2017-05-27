import { Component, Input } from '@angular/core';
import { Currently } from './dark-sky-response.model';

@Component({
  selector: 'ma-weather-content',
  templateUrl: 'ma-weather-content.html'
})
export class MaWeatherContentController {
  private _options: Currently | any = {};
  constructor() {}
  @Input() set options(val: Currently | any) {
    this._options = val;
  }

  public getReadableTime(time: number): string {
    if (time) {
      let d = new Date(time * 1000);
      return d.getHours() + ':' + d.getMinutes();
    } else {
      return '';
    }
  }
}
