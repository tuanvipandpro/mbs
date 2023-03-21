import { PersonActionType } from "../actions/person"

const init = {
  loading: true,
  detail: null,
  processing: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = init, action) {
  switch (action.type) {
    case PersonActionType.GET_PERSON_LIST:
      return {
        ...state,
        loading: true
      }
    case PersonActionType.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.map(e => {
          e.key = e._id
          return e
        }),
        options: action.payload.map(e => {
          e.value = e._id
          e.label = e.name
          return e
        })
      }
    case PersonActionType.GET_LIST_ERROR:
      return {
        ...state,
        processing: false,
      }
    default: 
      return state
  }
}