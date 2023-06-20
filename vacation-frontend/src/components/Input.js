import React from 'react'

function Input(props) {
  return (
    <>
        <label>{props.label} </label>
            <input
              className={`${
                !props.isValid && props.isProcced ? "invalid" : ""
              }`}
              onChange={props.onChange}
              id={props.id}
              type={props.type}
              placeholder={props.placeholder}
            />
    </>
  )
}

export default Input