import MarketController from './src/controller/MarketController'
import PersonController from './src/controller/PersonController'

module.exports = (app) => {
  app.route('/api/market/get-list')
    .get(MarketController.getMarkets)

  app.route('/api/market')
    .post(MarketController.createMarket)

  app.route('/api/persons')
    .get(PersonController.getPersons)
}