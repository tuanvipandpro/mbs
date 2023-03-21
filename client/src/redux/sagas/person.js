import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import PersonActions, { PersonActionType } from '../actions/person'
import { getPersons } from '../apis/person'

function* handleGetList({ payload }) {
  try {
    const result = yield call(getPersons, payload)
    yield put(PersonActions.onGetListSuccess(result))
  } catch (error) {
    yield put(PersonActions.onGetListError(error))
  }
}

export function* watchGetList() {
  yield takeEvery(PersonActionType.GET_PERSON_LIST, handleGetList)
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
  ])
}
