const { Client } = require('pg');

const express = require('express')
const app = express()
const port = 3000

const { PGUSER, PGPASSWORD, PGSERVER } = process.env;
const PGDB = "sampledb";




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
    const client = new Client({
        user: PGUSER,
        password: PGPASSWORD,
        host: PGSERVER,
        port: 5432,
        database: PGDB,
      })
    console.log("Testing database connection");
    client.connect((err) => {
        if(err)
        {
            console.log("unable to connect")
            console.log(err)
            res.send({
                server: true,
                database: false,
                err: err
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