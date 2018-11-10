import React from 'react'
import renderer from 'react-test-renderer'

import { Forecast } from '../Forecast'

describe('Component Forecast', () => {
  it('renders correctly', () => {
    const forecast = {
      day: 'Monday',
      low: '20',
      high: '30',
    }

    const tree = renderer
      .create(<Forecast forecast={forecast} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
