const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(__dirname)
// console.log(publicDirectoryPath)

app.set('view engine', 'hbs') // for hbs files
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath)) // for html files

app.get('', (req, res) => {
  res.render('index', {
    name: 'Rohit Oswal',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Rohit Oswal',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    text: 'This is the help guide.',
    name: 'Rohit Oswal',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search input.',
    })
  }

  geocode(req.query.search, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send(error)
    }

    forecast(latitude, longitude, (error, forecastData, country, timezone) => {
      if (error) {
        return res.send(error)
      }
      res.send({
        forecast: forecastData,
        location: req.query.search,
        country: country,
        timezone: timezone,
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('notFound', {
    etext: 'Help article not found',
    name: 'Rohit Oswal',
  })
})

app.get('*', (req, res) => {
  res.render('notFound', {
    etext: 'Page not found',
    name: 'Rohit Oswal',
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
