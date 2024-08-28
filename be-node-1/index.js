const { Client } = require('pg');

const express = require('express')
const app = express()
const port = 3000

const { PGUSER, PGPASSWORD, PGSERVER, NODE_ENV} = process.env;
const PGDB = "sampledb";

const connectionString = `postgresql://${PGUSER}:${PGPASSWORD}@${PGSERVER}/${PGDB}`
//if (NODE_ENV === undefined)
//{
//    const connectionString = `postgresql://${PGUSER}:${PGPASSWORD}@${PGSERVER}/${PGDB}`
//}


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
    const client = new Client(connectionString)
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