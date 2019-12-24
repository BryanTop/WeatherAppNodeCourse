const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup hbs and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup public dir
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
    res.render('index', {title: 'Weather App', name: 'Bryan Top'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About', name: 'Bryan Top'});
});

app.get('/help', (req, res) => {
    res.render('help', {title: 'Help', message: 'Helpful page'});
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                "error": error
            })
        }
        forecast(latitude, longitude, (error, {
            data
        }) => {
            if (error) {
                return res.send({
                    "error": error
                })
            }
            console.log(location);
            console.log(data.currently);
            res.send({
                "forecast": data.currently.summary + '. The temperature is ' + data.currently.temperature,
                location,
                'address': req.query.address
            });
        });
    });

   
});


app.get('*', (req, res) => {
    res.send('404 page');
})


app.listen(3000, () => {
    console.log("server started on port 3000");
});