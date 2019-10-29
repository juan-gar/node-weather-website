const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
app.use(express.static(publicDir))
hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Juan'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Juan'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help page',
        name: 'Juan'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address needed'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,place} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, { summary,temperature, rain}) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                summary,
                temperature,
                rain
            })

        })
        
    })

    

})
app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'Please provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) =>{
    res.send('Help article not found')
})

app.get('*', (req,res) => {
    res.render('404',{
        title: 'error 404'
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 