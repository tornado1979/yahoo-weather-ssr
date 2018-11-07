import React from 'react'
import propTypes from 'prop-types'

export const Form = ({ handleClick }) => {
  function submitForm(event) {
    event.preventDefault()
    const form = event.target
    const input = form.getElementsByTagName('input')[0]

    if (input.value.trim() !== '') {
      handleClick(input.value)
      input.value = ''
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={submitForm}>
        <input placeholder="type a city/zipcode" type="text" />
        <button className="btn" type="submit">Add city</button>
      </form>
    </div>
  )
}

Form.propTypes = {
  handleClick: propTypes.func.isRequired,
}
