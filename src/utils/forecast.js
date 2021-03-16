const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6c4f75e41c295342ed10c4671e86720a&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) callback("Unable to connect to weather services", null);
    else if (body.error) callback("Unable to find location", null);
    else
      callback(null, {
        temperature: body.current.temperature,
        pressure: body.current.pressure,
        weatherDesc: body.current.weather_descriptions[0],
      });
  });
};

module.exports = forecast;
