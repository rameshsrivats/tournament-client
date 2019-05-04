import React from 'react'

const TextInputGroup = ({
    type,
    placeholder,
    value,
    error,
    onChange
}) => {
  return (
    <div className="form-group">
        
        <input 
            type={type} 
            value={value}
            className={ error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"}
            placeholder={placeholder}  
            onChange={onChange}
        /> 
        <div className="invalid-feedback">
            {error}
        </div>
    </div>
  )
}

export default TextInputGroup

