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
  isLoading,
} from '../selectors'
import { Forecast } from './Forecast'
import Cities from './Cities'
import { Form } from './Form'

class Weather extends Component {
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
    } = this.props

    getData()

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
      isFetching,
    } = this.props

    const dataLoaded = !!Object.keys(weather).length

    return (
      <div className="weather-container fade-in">
        {/* 1. data finished loading and weather data DO exist */}
        {dataLoaded && (
          <div>
            {this.renderWeather()}
            <Form handleClick={(event) => this.addCity(event)} />
          </div>)
        }
        {/* 2. data loading */}
        {isFetching && <div className="loader">Data is loading...</div>}

        {/* 3. data is not loading and weather data NOT exist */}
        {!isFetching && !dataLoaded && <div className="loader">No data for that City :(</div>}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cities: getCities(state),
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
  fetchData: propTypes.func.isRequired,
  isFetching: propTypes.bool.isRequired,
  weather: propTypes.shape().isRequired,
}

export { loadData }

export default connect(mapStateToProps, { addCity, fetchData })(Weather)
