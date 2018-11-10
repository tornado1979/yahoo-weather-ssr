import React from 'react'
import renderer from 'react-test-renderer'

import Cities from '../Cities'

describe('Component Cities', () => {
  it('renders correctly', () => {
    const cities = ['Athens', 'Thessaloniki']
    const activeCity = 'Athens'

    const tree = renderer
      .create(<Cities activeCity={activeCity} cities={cities} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
