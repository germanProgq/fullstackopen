const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  const body = req.body
  if (!body) {
    return null
  }
  return JSON.stringify(body)
})

app.use(morgan(':method :url :status - :response-time ms :body'))

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch(next)
})

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`)
    })
    .catch(next)
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end()
      }
      res.json(person)
    })
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((deletedPerson) => {
      if (!deletedPerson) {
        return res.status(404).end()
      }
      res.status(204).end()
    })
    .catch(next)
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'Name or number must be in the entry' })
  }

  const person = new Person({ name, number })

  person.save()
    .then((savedPerson) => res.status(201).json(savedPerson))
    .catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'Name or number must be in the entry' })
  }

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return res.status(404).end()
      }
      res.json(updatedPerson)
    })
    .catch(next)
})

const unknownEndpoint = (_req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
