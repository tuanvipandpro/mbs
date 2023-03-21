import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import MarketActions, { MarketActionType } from '../actions/market'
import { getMarkets, createMarket } from '../apis/market'

function* handleGetList({ payload }) {
  try {
    const result = yield call(getMarkets, payload)
    yield put(MarketActions.onGetListSuccess(result))
  } catch (error) {
    yield put(MarketActions.onGetListError(error))
  }
}

function* handleCreate({ payload }) {
  try {
    const result = yield call(createMarket, payload)
    yield put(MarketActions.onCreateSuccess(result))
  } catch (error) {
    yield put(MarketActions.onCreateError(error))
  }
}

export function* watchGetList() {
  yield takeEvery(MarketActionType.GET_MARKETS, handleGetList)
}

export function* watchCreate() {
  yield takeEvery(MarketActionType.CREATE_MARKET, handleCreate)
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchCreate)
  ])
}
