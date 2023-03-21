import marketModel from '../model/market'

module.exports = {
  getMarkets: async (req, res) => {
    const filter = {}

    if (req.query.paymentId) filter.paymentId = req.query.paymentId
    if (req.query.date) filter.date = req.query.date
    if (req.query.marketer) filter.marketer = req.query.marketer

    const sort = {
      date: 1
    }

    marketModel.find(filter).sort(sort)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({error : err, msg: 'Get Markets Error !!!'})
      })
  },
  createMarket: async (req, res) => {
    const body = req.body

    const market = {
      createdAt: new Date(),
      type: body.type,
      content: body.content,
      date: body.date,
      total: body.total,
      marketer: {
        _id: body.marketer.id,
        name: body.marketer.name
      },
      isPaid: false,
      paymentId: null
    }

    new marketModel(market).save()
      .then(response => res.status(200).json(response))
      .catch(error => res.status(500).json(error))
  },
  updateMarket: async () => {

  },
  deleteMarket: async () => {

  }
}