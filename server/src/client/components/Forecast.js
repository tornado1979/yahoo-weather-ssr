import React from 'react'
import propTypes from 'prop-types'

export const Forecast = ({ forecast }) => {
  return (
    <div className="forecast-item">
      <div className="day">{forecast.day}</div>
      <div className="temp-container">
        <div className="low-temp">
          <span>L</span>
          {forecast.low}
        </div>
        <div className="high-temp">
          <span>H</span>
          { forecast.high }
        </div>
      </div>
    </div>
  )
}

Forecast.propTypes = {
  forecast: propTypes.shape({
    day: propTypes.string,
    hight: propTypes.string,
    low: propTypes.string,
  }).isRequired,
}
