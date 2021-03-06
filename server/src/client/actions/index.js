import axios from 'axios'
import {
  FETCH_DATA,
  ADD_CITY,
  REQUEST_DATA,
  RECEIVE_DATA_FAIL,
} from './types'

export const addCity = (city) => {
  return {
    payload: city,
    type: ADD_CITY,
  }
}

export const requestData = () => {
  return {
    payload: {
      isFetching: true,
    },
    type: REQUEST_DATA,
  }
}

export const error = (err) => {
  return {
    error: {
      data: err.response.data,
      status: err.response.status,
      statusText: err.response.statusText,
    },
    type: RECEIVE_DATA_FAIL,
  }
}

export const fetchData = (city = 'San Diego') => async (dispatch) => {
  const API_URL = 'https://query.yahooapis.com/v1/public/yql?q='
  const query = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${city}')`
  const format = '&format=json'

  dispatch(requestData())

  try {
    const res = await axios.get(`${API_URL}${query}${format}`)

    dispatch({
      payload: {
        isFetching: false,
        res,
      },
      type: FETCH_DATA,
    })
  } catch (err) {
    dispatch(error(err))
  }
}
