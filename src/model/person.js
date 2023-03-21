import {Schema, model} from 'mongoose'

const personSchema = Schema({
  isActive: {
    type: Boolean,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  birthdate: {
    type: String,
    require: true
  }
})

module.exports = model('person', personSchema, 'person')