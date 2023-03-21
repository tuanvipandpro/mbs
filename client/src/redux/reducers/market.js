import { MarketActionType } from '../actions/market'
import { TYPE_ENUM } from '../../utils/constants'
import moment from 'moment'

const init = {
  loading: true,
  detail: null,
  processing: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = init, action) {
  switch (action.type) {
    case MarketActionType.GET_MARKETS:
      return {
        ...state,
        loading: true
      }
    case MarketActionType.GET_MARKETS_SUCCESS:
      let total = 0
      let totals = []
      TYPE_ENUM.forEach(e => {
        action.payload.forEach(i => {
          if (e === i.type) total = total + i.total
        })
        totals.push({type: e, total: total, key: Math.random()} )
        total = 0
      })

      totals.forEach(e => {
        total = total + e.total
      })

      const amount = moment(action.payload[action.payload.length - 1].date).diff(moment(action.payload[0].date), 'days')

      return {
        ...state,
        loading: false,
        list: action.payload ,
        total: total,
        totals: totals,
        amount: amount
      }
    case MarketActionType.GET_MARKETS_ERROR:
      return {
        ...state,
        processing: false,
      }
    case MarketActionType.CREATE_MARKET:
      return {
        ...state,
        loading: true
      }
    case MarketActionType.CREATE_MARKET_SUCCESS:
      return {
        ...state,
        loading: false,
        market: action.payload
      }
    case MarketActionType.CREATE_MARKET_ERROR:
      return {
        ...state,
        processing: false
      }
    default: 
      return state
  }
}