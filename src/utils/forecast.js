const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=eedc30d601178c2ab246ae528b953986&query='+ latitude + ',' + longitude + '&units=m';

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('~|~ Unable to connect to location services', undefined)
        } else if (response.body.error) {
            callback('Unable to find location co-ordinates. Please try with new location!', undefined)
        } else {
            callback(undefined, {
                location: response.body.location.name + ', ' + response.body.location.region + ', ' + response.body.location.country,
                weather: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            })
        }
    })
}

module.exports = forecast;