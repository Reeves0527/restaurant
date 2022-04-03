const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index', { restaurantsData: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keywords.trim()
  const restaurants = restaurantList.results.filter(restautant => {
    return restautant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurantsData: restaurants })
})

app.get('/restaurants/:restaurant_id', (req,res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurantData: restaurant })
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Express is running http://localhost:${port}`)
})