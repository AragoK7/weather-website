const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?limit=2&access_token=pk.eyJ1Ijoic29kYXhlZDg3NCIsImEiOiJja2xkdGZ1NzIyNnFuMnducGJieGF6MDN4In0.PzlBh4GDHGxxeM6YdEY1sw";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", null);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search!", null);
    } else {
      return callback(null, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
