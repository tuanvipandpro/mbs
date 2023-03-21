import { combineReducers } from 'redux'

import person from './person'
import market from './market'

export default combineReducers({
  market,
  person
})