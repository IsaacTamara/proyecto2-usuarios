const express = require('express')
const app = express()

app.use(express.json())

const userBD = []
let baseId = 1

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server OK'
  })
})

app.post('/users', (req, res) => {
  const data = req.body

  const newUser = {    
    "id": baseId++,
    "firstName": data.firstName,
    "lastName": data.lastName,
    "email": data.email,
    "password": data.password,
    "age": data.age
  }
  userBD.push(newUser)
  res.status(201).json(newUser)
}) 

app.get('/users', (req, res) => {
  res.status(200).json(userBD)
})

app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id)

  const data = userBD.find((item) => id === item.id)

  if (data) {
    res.status(200).json(
      data
    )   
  }else {
    res.status(404).json({
      message: 'Invalid id'
    })
  }
})

app.listen(9000, () => {
  console.log('server started at http://localhost:9000')
})

module.exports = app
