import {
  FETCH_DATA,
  REQUEST_DATA,
  RECEIVE_DATA_FAIL,
} from '../actions/types'

const initState = []

export default (state = initState, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      // Keep weather data on state, so as the end-user watches the previous city weather, until
      // 'FETCH_DATA' loads the new city data
      // Another option is a loader spinner or sth.
      return {
        ...state,
        isFetching: action.payload.isFetching,
      }
    case RECEIVE_DATA_FAIL:
      return {
        ...state,
      }
    case FETCH_DATA:
      return {
        data: action.payload.res.data.query.results,
        isFetching: action.payload.isFetching,
      }
    default:
      return state
  }
}
