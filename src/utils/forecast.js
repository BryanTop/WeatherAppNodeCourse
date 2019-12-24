const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/15b0bc398f8ab42c56ebee74be6dc0b4/' + lat + ',' + long;

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {

        if (error) {
            callback('Unable to connect to forcast service', undefined);
        } else if (body.error) {
            callback('Unable to find forecast ' + body.error, undefined);
        } else {
            const data = body;
            callback(undefined, {
                data: data
            });
        }
    });
};

module.exports = forecast;