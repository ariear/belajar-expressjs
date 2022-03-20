const express = require('express')
const app = express()
app.use(express.static('public'))   // untuk mengakses folder public

const userRouter = require('./router/users')    // untuk mengakses route users


app.set('view engine' , 'ejs')  // untuk menentukan templating engine

app.use(express.json())                         // untuk menerima request
app.use(express.urlencoded({extended: true}))   //

const myLogger = (request, response, next) => {     // <-- this is middleware in express 
    request.tgl = new Date()
    console.log('LOGGED')
    next()
}

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sekolah');

app.use(myLogger)

app.get('/', (request, response) => {
    // response.redirect('/siswas')
    console.log(request.tgl.toString())
    response.render('index', {
        title: 'This is Page Home Cuy'
    })
})

app.use(userRouter)

app.get('/siswas', (request , response) => {
    response.json(dataSiswa)
})

app.get('/about', (request, response) => {
    response.render('about')
})


const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})