const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongo = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const User = require('./models/user')

dotenv.config()

const app = express()

mongo.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true 
}, (err) => {
	if (err) {
		console.log(err)
	} else {
		console.log('Succesfully connected to mongodb')
	}
})  

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const ownerRoutes = require('./routes/owner')

app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', ownerRoutes)

app.get('/', (req, res) => {
	res.json('Hello world from the node server')
})

app.post('/', (req, res) => {
	let user = new User()
	user.name = req.body.name 
	user.email = req.body.email 
	user.password = req.body.password 

	user.save((err) => {
		if (err) {
			res.json(err)
		} else {
			res.json('User saved to mongo database')
		}
	})
})

app.listen(8000, err => {
	if (err) {
		console.log(err)
	} else {
		console.log("listening on port", 8000)
	}
})