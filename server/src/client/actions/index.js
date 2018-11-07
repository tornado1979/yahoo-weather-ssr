import axios from 'axios'
import {
  FETCH_DATA,
  ADD_CITY,
} from './types'

export const addCity = (city) => {
  return {
    payload: city,
    type: ADD_CITY,
  }
}

export const fetchData = (city = 'San Diego') => async dispatch => {
  const API_URL = 'https://query.yahooapis.com/v1/public/yql?q='
  const query = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${city}')`
  const format = '&format=json'

  try {
    const res = await axios.get(`${API_URL}${query}${format}`)

    dispatch({
      payload: res,
      type: FETCH_DATA,
    })
  } catch (err) {
    console.log('ERROR: ', err) // eslint-disable-line
  }
}
