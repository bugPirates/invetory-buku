const path = require('path');
const express = require('express');
const hbs = require('hbs')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const conn =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'buku_db'
});

conn.connect((err) =>{
    if(err) throw err;
    console.log('DB connected . . .');
});

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('assets', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    let sql = "SELECT * FROM data_buku";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.render('book_view', {
            results: results
        });
    });
});

app.post('/save', (req, res) =>{
    let data = {namabuku: req.body.namabuku, jenisbuku: req.body.jenisbuku, penulis: req.body.penulis, penerbit: req.body.penerbit, tahunterbit: req.body.tahunterbit, owner: req.body.owner}
    let sql = "INSERT INTO data_buku SET ?";
    let query = conn.query(sql, data,(err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});

app.post('/update', (req, res) => {
    let sql = "UPDATE data_buku SET namabuku='"+req.body.namabuku+"', jenisbuku='"+req.body.jenisbuku+"', penulis='"+req.body.penulis+"', penerbit='"+req.body.penerbit+"', tahunterbit'"+req.body.tahunterbit+"', owner'"+req.body.owner+"' WHERE id_buku="+req.body.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});

app.post('/delete', (req, res) =>{
    let sql = "DELETE FROM data_buku WHERE id_buku="+req.body.id_buku+"";
    let query = conn.query(sql, (err, results) =>{
        if(err) throw err;
        res.redirect('/');
    });
});

app.listen(5000, () =>{
    console.log('server is running on port 5000');
});