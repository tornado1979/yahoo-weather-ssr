import { ADD_CITY } from '../actions/types'

const initState = ['San Diego, CA', 'New York, NY', 'Juneau, AK']

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_CITY:
      return [
        ...state,
        action.payload,
      ]
    default:
      return state
  }
}
