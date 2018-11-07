import { FETCH_DATA } from '../actions/types'

const initState = []

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload.data.query.results
    default:
      return state
  }
}
