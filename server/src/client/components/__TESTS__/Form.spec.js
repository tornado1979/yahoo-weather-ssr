import React from 'react'
import renderer from 'react-test-renderer'

import { Form } from '../Form'

describe('Component Form', () => {
  it('renders correctly', () => {
    const handleClick = () => console.log('form submited')

    const tree = renderer
      .create(<Form handleClick={handleClick} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
