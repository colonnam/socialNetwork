const express = require('express')
const app = express()
var mysql      = require('mysql');

const path=require('path');

let pool;
    const createPool = async () => {
      
      pool = await mysql.createPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASS, 
        database: process.env.DB_NAME,
        socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
      });
    };
    createPool();

const port = process.env.PORT || 3000


app.get('/', (req,res)=>{

  res.sendFile(path.join(__dirname)+'/views/index.html')
})

app.get('/login', (req, res) => {
  pool.query('select * from users', function(err, rows, fields) {
    if (err) throw err;
    res.send(rows[0])
  })
  
})

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})