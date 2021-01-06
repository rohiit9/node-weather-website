const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=c6ed43286f2d873f603c03fa85cec8e2&query=' +
    latitude +
    ',' +
    longitude

  request({ url: url, json: true }, (error, { body }, country) => {
    if (error) {
      callback(
        'Unable to connect to weather service!',
        undefined,
        undefined,
        undefined
      )
    } else if (body.error) {
      callback('Unable to find location', undefined, undefined, undefined)
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. It is currently ' +
          body.current.temperature +
          ' degress celsius. It feels like ' +
          body.current.feelslike +
          ' degrees' +
          '. There is ' +
          body.current.precip +
          '% chance of rain.' +
          ' Humidity is ' +
          body.current.humidity +
          '%.',
        body.location.country,
        body.location.timezone_id
      )
    }
  })
}

module.exports = forecast
