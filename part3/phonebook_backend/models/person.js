const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URL
mongoose.set('strictQuery', false)
console.log('Connecting...')
mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('Issues encountered: ', err.message)
  })

const numberFormatValidator = {
  validator: (value) => /^\d{2,3}-\d+$/.test(value),
  message: (props) => `${props.value} is not a valid phone number`
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: numberFormatValidator
  }
})

personSchema.set('toJSON', {
  transform: (document, retrievedObject) => {
    retrievedObject.id = retrievedObject._id.toString()
    delete retrievedObject.__v
    delete retrievedObject._id
  }
})

module.exports = mongoose.model('Person', personSchema)
