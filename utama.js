const express = require('express')
const app = express()
const port = 3000
const crud = require('./controllers/crud') // manggil modul lain

app.use('/crud', crud); // middleware, supaya routingnya itu bisa terbaca, ketika ada yg memanggil alamat /crud akan diarahkan ke const crud

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.get('/', (req, res) => res.send('Hello World!'))

app.get('/wedus', function(req, res){
    res.render('welcome',{datane: "bokir"});
})

app.get('/sapi', function(req, res){
    res.render('welcome',{datane: "bokir"});
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`)) // menjalankan server dengan port 3000