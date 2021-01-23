class Forecast {
    constructor() {
        this.key = 'tsEq3rrODVpXWzGgUGK8260dXOx2NGof';
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(cityValue) {
        const cityDetails = await this.getCity(cityValue);
        const weather = await this.getWeather(cityDetails.Key);
        return {cityDetails, weather};
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];

    }
}