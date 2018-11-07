import React from 'react'
import propTypes from 'prop-types'

const Cities = ({ activeCity, cities }) => {
  return (
    <ul>
      {cities.map((city, idx) => <li className={activeCity === city ? 'active' : 'normal'} key={city + idx}>{city}</li>)}
    </ul>
  )
}

Cities.propTypes = {
  activeCity: propTypes.string.isRequired,
  cities: propTypes.arrayOf(propTypes.oneOfType([propTypes.string])).isRequired,
}

export default Cities
