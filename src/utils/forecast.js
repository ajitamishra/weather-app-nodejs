const request = require("request");
const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=820ba51afa29bba6090b65ae828b44b9&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is " +
          body.current.temperature +
          " degrees out ." +
          "It feels like " +
          body.current.feelslike +
          " degrees out." +
          "There are " +
          body.current.cloudcover +
          " % chances of rain."
      );
    }
  });
};
module.exports = forecast;
