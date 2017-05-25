export class MaWeatherConfig {

    public monthsName: string[] = ['Jan', 'Feb', 'Mar', 'April' ,'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    private _darkSkyUrl: string = 'https://api.darksky.net/forecast/'
    private _darkSkyKey: string;
    private _googleUrl: string = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=true';
    private _googleKey: string;
    private _readableMessages: any = {
        getAddress: 'Could not get address of given coordinates',
        loadWeather: 'Could not get weather details for given coordinates',
        getUserLocation: 'Could not get current location, make sure GPS is on'
    }

    constructor() {}

    public get darkSkyUrl(): string {
        return this._darkSkyKey ? `${this._darkSkyUrl}${this._darkSkyKey}/` : '';
    }
    public get googleUrl(): string {
        return this._googleKey ? `${this._googleUrl}&api=${this._googleKey}&latlng=` : '';
    }

    /**
     * @description This method will be used to get api key for DarkSky from backend
     */
    public loadDarkSkyKey(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (1 === 1) {
                this._darkSkyKey = 'b8d4e29e8c714707f345fa0385038646';
                resolve();
            } else {
                reject();
            }
        });
    }

    /**
     * @description This method will be used to get api key for Google from backend
     */
    public loadGoogleKey(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (1 === 1) {
                this._googleKey = 'AIzaSyB1TJcPU4zM-ALaLk7XDG05EHiXYT58MPM';
                resolve();
            } else {
                reject();
            }
        });
    }

    public readableMessages(key: string): string {
        return this._readableMessages[key];
    }
}