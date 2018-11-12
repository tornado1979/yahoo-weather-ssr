import React from 'react'
import renderer from 'react-test-renderer'

import { Weather } from '../Weather'

describe('Component Weather', () => {
  it('renders correctly', () => {
    const addCity = () => console.log('add city')
    const cities = ['Athens', 'Thessaloniki']
    const fetchData = () => console.log('fetch data')
    const isFetching = false
    const weather = {}
    const error = {}

    const tree = renderer
      .create(<Weather
        addCity={addCity}
        cities={cities}
        fetchData={fetchData}
        isFetching={isFetching}
        weather={weather}
        error={error}
      />)
    expect(tree).toMatchSnapshot()
  })
})
