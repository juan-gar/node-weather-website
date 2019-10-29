const request = require('request')

const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1IjoiZ2VuaXVzYXRnZW9jb2RpbmciLCJhIjoiY2sxcDl0aW1rMHM2azNrcWtydTNpaTlrZiJ9.1l9TwAEmUuTTyw9ihk3IxA&limit=1`

    request({url, json: true}, (error,response) => {
        if (error) {
            callback('Unable to connect to location services',undefined)
        } else if(response.body.features.length === 0) {
            callback('Bad Request',undefined)
        } else {
            // const {place = response.body.features[0].place_name, latitude = response.body.features[0].center[1],longitude = response.body.features[0].center[1]} = response

            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode