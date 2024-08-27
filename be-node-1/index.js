const express = require('express')
const app = express()
const port = 3000
import pg from 'pg'
const uri = require("../utils/pgConn").getPGConnectionString();
const { Client } = pg
 
const client = new Client(uri)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/test', (req, res) => {
    res.send('Testing!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.get("/health", async (req, res) => {
    let dbStatus = false;
    console.log("Testing database connection");
    client.connect((err) => {
        if(err)
        {
            console.log("unable to connect")
            console.log(err)
            res.send({
                server: true,
                database: false
                }).status(501);
        }
        else{
            console.log(`Database status is ${dbStatus}`);
            res.send({
            server: true,
            database: true
            }).status(200);
        }
     })
     client.end()
})