export const PersonActionType = {
  GET_PERSON_LIST: 'GET_PERSON_LIST',
  GET_LIST_SUCCESS: 'GET_LIST_SUCCESS',
  GET_LIST_ERROR: 'GET_LIST_ERROR'
}

const onGetList = () => ({
  type: PersonActionType.GET_PERSON_LIST,
})

const onGetListSuccess = (list) => ({
  type: PersonActionType.GET_LIST_SUCCESS,
  payload: list,
})

const onGetListError = (error) => ({
  type: PersonActionType.GET_LIST_ERROR,
  payload: error,
})

const UserActions = {
  onGetList,
  onGetListSuccess,
  onGetListError
}

export default UserActions