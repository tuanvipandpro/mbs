export const MarketActionType = {
  GET_MARKETS: 'GET_MARKETS',
  GET_MARKETS_SUCCESS: 'GET_MARKETS_SUCCESS',
  GET_MARKETS_ERROR: 'GET_MARKETS_ERROR',
  CREATE_MARKET: 'CREATE_MARKET',
  CREATE_MARKET_SUCCESS: 'CREATE_MARKET_SUCCESS',
  CREATE_MARKET_ERROR: 'CREATE_MARKET_ERROR'
}

const onGetList = () => ({
  type: MarketActionType.GET_MARKETS,
})

const onGetListSuccess = (list) => ({
  type: MarketActionType.GET_MARKETS_SUCCESS,
  payload: list,
})

const onGetListError = (error) => ({
  type: MarketActionType.GET_MARKETS_ERROR,
  payload: error,
})

const onCreate = (data) => ({
  type: MarketActionType.CREATE_MARKET,
  payload: data
})

const onCreateSuccess = (market) => ({
  type: MarketActionType.CREATE_MARKET_SUCCESS,
  payload: market,
})

const onCreateError = (error) => ({
  type: MarketActionType.CREATE_MARKET_ERROR,
  payload: error,
})

const MarketActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,
  onCreate,
  onCreateSuccess,
  onCreateError
}

export default MarketActions