import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { fetchData } from '../actions'
import {
  getWeather,
  getCities,
} from '../selectors'
import { Forecast } from './Forecast'
import Cities from './Cities'

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeCity: 'San Diego, CA',
      indx: 1,
    }
  }

  componentDidMount() {
    const {
      fetchData: getData,
    } = this.props

    getData()

    // set 5secs interval between the cities weather information
    const { cities } = this.props

    setInterval(() => {
      this.setState({
        indx: this.state.indx + 1, // eslint-disable-line
        activeCity: cities[this.state.indx%cities.length],// eslint-disable-line
      })
      getData(this.state.activeCity)// eslint-disable-line
    }, 5000)
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
    } = this.props

    const {
      activeCity,
    } = this.state

    if (Object.keys(weather).length) {
      const {
        item,
        location,
        units,
      } = weather

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
        ]
      )
    }

    // in case something is wrong
    return <div>No Data. Something gone wrong :(</div>
  }

  render() {
    const {
      weather,
    } = this.props

    const dataLoaded = !!Object.keys(weather).length

    return (
      <div className="weather-container fade-in">
        {dataLoaded && this.renderWeather()}
        {!dataLoaded && <div className="loader">Data is loading...</div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cities: getCities(state),
    weather: getWeather(state),
  }
}

const loadData = (store) => {
  return store.dispatch(fetchData())
}

Weather.propTypes = {
  cities: propTypes.arrayOf(propTypes.oneOfType([propTypes.string])).isRequired,
  fetchData: propTypes.func.isRequired,
  weather: propTypes.shape().isRequired,
}

export { loadData }

export default connect(mapStateToProps, { fetchData })(Weather)
