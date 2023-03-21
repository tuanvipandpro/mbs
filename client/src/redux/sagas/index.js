import { all } from 'redux-saga/effects'

import person from './person'
import market from './market'

export default function* rootSaga(getState) {
  yield all([person(), market()])
}
