import {Schema, model} from 'mongoose'

const marketSchema = Schema({
  createdAt: {
    type: Date,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  marketer: {
    id: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    }
  },
  total: {
    type: Number,
    require: true
  }, 
  date: {
    type: Date,
    require: true
  },
  isPaid: {
    type: Boolean,
    require: true
  },
  paymentId: {
    type: String
  }
})

module.exports = model('market', marketSchema, 'market')