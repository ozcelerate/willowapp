
    export interface Currently {
        time: number;
        summary: string;
        icon: string;
        precipIntensity: number;
        precipProbability: number;
        temperature: number;
        apparentTemperature: number;
        dewPoint: number;
        humidity: number;
        windSpeed: number;
        windBearing: number;
        cloudCover: number;
        pressure: number;
        ozone: number;
    }

    export interface Hourly {
        summary: string;
        icon: string;
        data: Currently[];
    }

    export interface DailyData {
        time: number;
        summary: string;
        icon: string;
        sunriseTime: number;
        sunsetTime: number;
        moonPhase: number;
        precipIntensity: number;
        precipIntensityMax: number;
        precipProbability: number;
        temperatureMin: number;
        temperatureMinTime: number;
        temperatureMax: number;
        temperatureMaxTime: number;
        apparentTemperatureMin: number;
        apparentTemperatureMinTime: number;
        apparentTemperatureMax: number;
        apparentTemperatureMaxTime: number;
        dewPoint: number;
        humidity: number;
        windSpeed: number;
        windBearing: number;
        cloudCover: number;
        pressure: number;
        ozone: number;
        precipIntensityMaxTime?: number;
        precipType: string;
        dateName?: string;
        locationName?: string;
    }

    export interface Daily {
        summary: string;
        icon: string;
        data: DailyData[];
    }

    export interface Flags {
        sources: string[];
        'isd-stations': string[];
        units: string;
    }

    export interface DarkSkyResponse {
        latitude: number;
        longitude: number;
        timezone: string;
        offset: number;
        currently: Currently;
        hourly: Hourly;
        daily: Daily;
        flags: Flags;
    }
