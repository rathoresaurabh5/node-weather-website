const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
// const { query } = require('express');
const chalk = require('chalk')

const app = express();
//configure/use port provided by heroku and a default port 3000 for in case we run it locally.
const port = process.env.PORT || 3000 

//Define paths for Express config
    // console.log(__dirname);
    // console.log(__filename);
    // console.log(path.join(__dirname, '../public'))
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//to start monitoring with nodemon use: 
// npm init -y
// nodemon -e js,html,hbs ./src/app.js

//Configure handlebars

    //to setup handlebars for dynamic templating in our express server
app.set('view engine', 'hbs');

    //to setup 'views' path to use in handlebar
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


//Express route handler
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather with NodeJS',
        name: 'WeatherMan'
    })
})

app.get('/about', (req, res) =>{
    //console.log(req)
    // http://localhost:3000/about?name=chihua&age=2
    // console.log(req.query.name);
    // console.log(req.query.age);
    console.log(req.query)
    res.render('about', {
        title: 'About WeatherMan',
        planet: 'Weatherix'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
           error: 'Incorrect address was provided'
        })
    } 
    geocode(req.query.address, (error, geocodeResponse) => {

        if (error) {
           console.log(error) 
           return res.send({
               error: error
           })
        }
    
        forecast(geocodeResponse.longitude, geocodeResponse.latitude, (error,forecastResponse) => {

            if (error) {
                console.log(error);
                return res.send({
                    error:error
                })
            }
            
            //Log to console
            console.log(chalk.bold.cyan(geocodeResponse.location));
            console.log(chalk.green('Locality: ' + forecastResponse.location + '\n' + 'Weather : ' + forecastResponse.weather + '\n' + 'Temperat: ' + forecastResponse.temperature + ' deg \n' + 'Feels   : ' + forecastResponse.feelslike + ' deg'))

            res.send({
                Address : req.query.address,
                Locality: forecastResponse.location, 
                Weather : forecastResponse.weather,
                Temperature: forecastResponse.temperature, 
                Feels   : forecastResponse.feelslike 
            })
        });
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Helpi Helperson',
        x: 'Nerdimon',
        y: 'Supports 24x7'
    })
})

// app.get('/about/*', (req, res) => {
//     res.send('No sub-page for about found!')
// })

app.get('/help/*', (req, res) => {
    res.send("No sub-page for help found!")
})

app.get('*',(req, res) => {
    res.render('404-error', {
        title: 'Error!',
        error: 'Ooopsies..'
    })
})


// app.get('', (req,res) =>{
//     res.send('Hello Express');
// })

// app.get('/about', (req,res) => {
//     // const img = 'D:/nodeJS/practice/node-course/misc/steven-van-elk-1OnbCf7AOdY-unsplash.jpg'
//     // res.sendFile(img)
//     res.send('<h1>About</h1>')
// })

// app.get('/weather', (req,res) => {
//     res.send({
//         foercast: 'It is snowing',
//         location: 'Philadelphia'
//     })
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

