const request = require('request');


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmVkaG90a25pZmUiLCJhIjoiY2toamM5cTF5MHAzazJ5dnNnNHdneDR4ZSJ9.RqaL-BVt1wpJIedJwB7UMA&limit=1'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('~|~ Unable to connect to weather services!', undefined);
        } else if (response.body.features === undefined || 
            response.body.features.length === 0 || 
            response. body.message === 'Not Authorized - No Token') {
            callback('Unable to find location data. Please try with a new keyword!', undefined)
        } else {
           callback(undefined, { 
                location: response.body.features[0].place_name, 
                latitude: response.body.features[0].center[0], 
                longitude: response.body.features[0].center[1]
            })
        }       
    })
}

module.exports = geocode;
    