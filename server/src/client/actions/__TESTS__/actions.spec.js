import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import {
  addCity,
  requestData,
  error,
  fetchData,
} from '../index'

import * as types from '../types'

describe('actions', () => {
  it('should create an action to request data', () => {
    const action = {
      payload: {
        isFetching: true,
      },
      type: types.REQUEST_DATA,
    }
    expect(requestData()).toEqual(action)
  })

  it('should create an action to add a city', () => {
    const city = 'Athens'
    const action = {
      payload: city,
      type: types.ADD_CITY,
    }
    expect(addCity(city)).toEqual(action)
  })

  it('should create an action to data fail', () => {
    const err = {
      response: {
        data: {
          error: 'error msg',
        },
        status: 400,
        statusText: 'Bad request',
      },
    }

    const action = {
      error: {
        data: {
          error: 'error msg',
        },
        status: 400,
        statusText: 'Bad request',
      },
      type: types.RECEIVE_DATA_FAIL,
    }
    expect(error(err)).toEqual(action)
  })

  it('should dispatch `REQUEST_DATA` & `FETCH_DATA` on fetchdata', (done) => {
    const city = 'Athens'
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)

    moxios.install()

    const response = {

    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        response,
        status: 200,
      })
    })

    const expectedActions = [types.REQUEST_DATA, types.FETCH_DATA]

    const store = mockStore({ weather: {} })

    return store.dispatch(fetchData(city)).then(() => {
      const dispatchedActions = store.getActions()
      const actionTypes = dispatchedActions.map(action => action.type)
      expect(actionTypes).toEqual(expectedActions)
      done()
    })
  })
})
