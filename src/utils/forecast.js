const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1a8419dc9424599ad0ede5674014e1f7&%20query=" +
    +latitude +
    "," +
    longitude +
    "&units=f ";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      // const data = JSON.parse(response.body);
      // console.log(data.current);
      // console.log(response.body.current);

      callback(
        undefined,
        "it is currently " +
          body.current.temperature +
          "degress. There is " +
          body.current.feelslike +
          "% chance of rain "
      );
    }
  });
};

module.exports = forecast;
