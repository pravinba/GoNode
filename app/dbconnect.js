'use strict'

const pg = require('pg')  
const express = require('express')
const bodyParser = require('body-parser');
const conString = 'postgres://postgres:password@localhost/node_hero'
const app = express()
const port = 8081

app.use(bodyParser.json());

app.post('/users', function (req, res, next) {  
  const user = req.body
  //user.age = 21
  //user.name = 'pravinba'
  console.log(`Age: ${user.age} Name: ${user.name}`)
pg.connect(conString, function (err, client, done) {  
   if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      res.send(200)
    })
  })
})

app.get('/users', function (req, res, next) {  
  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('SELECT name, age FROM users;', [], function (err, result) {
      done()

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      res.json(result.rows)
    })
  })
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})