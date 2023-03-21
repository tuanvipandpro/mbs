import {Schema, model} from 'mongoose'

const paymentSchema = Schema({
  createdAt: {
    type: Date,
    require: true
  },
  from: {
    type: Date,
    require: true
  },
  to: {
    type: Date,
    require: true
  },
  total: {
    type: Number,
    require: true
  }
})

module.exports = model('payment', paymentSchema, 'payment')