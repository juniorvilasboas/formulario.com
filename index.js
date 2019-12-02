const express = require('express')
const sqlite = require('sqlite')
const bodyParser = require('body-parser')

const banco = require('./lib/banco')

const app = express()
const path = require('path')
const port = process.env.PORT || 3000
//const dbConnection = sqlite.open(path.resolve(__dirname, 'banco.sqlite'), { Promise })

app.get('/admin', (req, res, next) => {
    if(req.hostname === 'localhost') {
        next()
    } else {
        res.send('Not allowed')
    }
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('home')
})

//banco.init()

app.listen(port, (err) => {
    if(err) {
        console.log('Erro ao iniciar servidor!')
    }
})