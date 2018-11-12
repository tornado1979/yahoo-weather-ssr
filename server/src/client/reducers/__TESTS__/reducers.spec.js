import * as types from '../../actions/types'
import cityReducer from '../cityReducer'
import weatherReducer from '../weatherReducer'

describe('weather reducer', () => {
  it('should return initial state', () => {
    const initState = []

    expect(weatherReducer(undefined, {})).toEqual(initState)
  })

  it('should handle REQUEST_DATA', () => {
    const data = {
      data: {
        query: {
          results: [],
        },
      },
    }
    const action = {
      payload: {
        isFetching: true,
        data,
      },
      type: types.REQUEST_DATA,
    }

    expect(weatherReducer(data, action)).toEqual({
      ...data,
      isFetching: action.payload.isFetching,
    })
  })

  it('should handle FETCH_DATA', () => {
    const initState = []
    const res = {
      data: {
        query: {
          results: [],
        },
      },
    }
    const action = {
      payload: {
        isFetching: false,
        res,
      },
      type: types.FETCH_DATA,
    }
    expect(weatherReducer(initState, action)).toEqual({
      data: res.data.query.results,
      isFetching: action.payload.isFetching,
    })
  })
})

describe('city reducer', () => {
  it('should return initial state', () => {
    const initState = []

    expect(weatherReducer(undefined, {})).toEqual(initState)
  })

  it('should handle ADD_CITY', () => {
    const state = ['San Diego, CA', 'New York, NY', 'Juneau, AK']

    const action = {
      payload: 'Athens',
      type: types.ADD_CITY,
    }

    expect(cityReducer(state, action)).toEqual([
      ...state,
      action.payload,
    ])
  })
})
