import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import {
  fetchData,
  addCity,
} from '../actions'
import {
  getWeather,
  getCities,
  getError,
  isLoading,
} from '../selectors'
import { Forecast } from './Forecast'
import Cities from './Cities'
import { Form } from './Form'

export class Weather extends Component {
  constructor(props) {
    super(props)
    // init local state
    this.state = {
      activeCity: 'San Diego, CA',
      citiesCount: 3,
      indx: 0,
    }
  }

  componentDidMount() {
    const {
      fetchData: getData,
      weather,
    } = this.props

    if (!weather.data) {
      getData()
    }

    // set 5secs interval between the cities weather information
    setInterval(() => {
      // reset index when exceeds cities count
      const index = this.state.indx + 1 > this.state.citiesCount-1 ? 0 : this.state.indx + 1 // eslint-disable-line

      this.setState({
        indx: index, // eslint-disable-line
        activeCity: this.props.cities[index%this.state.citiesCount],// eslint-disable-line
      })

      // fetch weather data
      getData(this.props.cities[index%this.state.citiesCount])// eslint-disable-line
    }, 5000)
  }

  componentDidUpdate(prevProps) {
    // update local state, if the user has added new City
    const {
      cities,
    } = this.props

    // https://reactjs.org/docs/react-component.html
    // It s not the best method to update localstate into here, so i update it very cosiously only
    // if cities is updated
    if (prevProps.cities.length < cities.length) {
      this.setState((state) => ({ citiesCount: state.citiesCount + 1 })) // eslint-disable-line
    }
  }

  addCity(value) {
    const {
      addCity: addNewCity,
    } = this.props

    addNewCity(value)
  }

  loading(msg) {
    return <div className="loader" key="6">{msg}</div>
  }

  // render forecast days
  renderForecast(forecastArray) {
    return forecastArray.map(day => <li key={day.date}><Forecast forecast={day} /></li>)
  }

  // render whole weather component
  renderWeather() {
    const {
      weather,
      cities,
      error,
      isFetching,
    } = this.props

    const {
      activeCity,
    } = this.state

    // weather has data
    if (Object.keys(weather).length) {
      const {
        item,
        location,
        units,
      } = weather

      const loading = this.loading('Data is loading...')
      const forecast = this.renderForecast(item.forecast)

      return (
        [
          <div className="current" key="1">
            <div className="center">
              <div className="city">{location.city}</div>
              <div className="text">{item.condition.text}</div>
            </div>
            <div className="temp">
              {item.condition.temp}
            </div>
            <div className="unit">{units.temperature}</div>
          </div>,
          <ul className="forecast-list" key="2">
            {forecast}
          </ul>,
          <div className="bottom" key="3">
            {weather.title}
            <span style={{ color: '#fff', fontWeight: 600, padding: '0 0.5rem' }}>|</span>
            {weather.lastBuildDate}
          </div>,
          <div className="cities" key="4">
            <Cities activeCity={activeCity} cities={cities} />
          </div>,
          <Form handleClick={(event) => this.addCity(event)} key="5" />,
          (isFetching && loading),
        ]
      )
    }

    // An error occured(during the API request).
    if (!isFetching && Object.keys(error).length) {
      return this.loading(`${error.statusText}: ${error.data.error.description}`)
    }

    // There are no data for that City
    return this.loading('No data for that City :(')
  }

  render() {
    return (
      <div className="weather-container fade-in">
        {this.renderWeather()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cities: getCities(state),
    error: getError(state),
    isFetching: isLoading(state),
    weather: getWeather(state),
  }
}

const loadData = (store) => {
  return store.dispatch(fetchData())
}

Weather.propTypes = {
  addCity: propTypes.func.isRequired,
  cities: propTypes.arrayOf(propTypes.oneOfType([propTypes.string])).isRequired,
  error: propTypes.shape().isRequired, // analyse the shape schema
  fetchData: propTypes.func.isRequired,
  isFetching: propTypes.bool.isRequired,
  weather: propTypes.shape().isRequired,
}

export { loadData }

export default connect(mapStateToProps, { addCity, fetchData })(Weather)
