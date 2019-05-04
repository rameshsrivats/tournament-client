import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import TextInputGroup from './TextInputGroup'
import { getUser, setToken } from '../../utils/auth-utils'

const ChangeHandle = (props) => {

  const [handle, setHandle] = useState('')
  const [errors, setErrors] = useState({})
  const [loader, setLoader] = useState(false)

  const onHandleChange = (e) => {
    setHandle(e.target.value)
    errors.handle=''
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const userData = {
      handle
    } 
    setLoader(true)
    try {
      const response = await axios.patch('/api/users/handle', userData)
      setLoader(false)
      const token = response.data.token
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      setToken(token)
      props.history.push('/me')
    } catch (err) {
      setLoader(false)
      setErrors(err.response.data)
    }
  }

  const user = getUser()
  const oldHandle = user.handle

  return (
    <div className="container auth-form-container" >
      <div className="row align-items-center justify-content-center auth-form-div" >
        <div className="col-sm-10 col-md-8 col-lg-6 bg-white rounded p-3">
          <p className=' text-muted text-center'>Your current username is {oldHandle}</p>
          <h1 className='display-4 text-center mt-0 mb-3'>Username</h1>
          <form noValidate className='p-3' onSubmit={onSubmit}>
            
            <TextInputGroup
              type='text'
              placeholder='Pick a new username'
              value={handle}
              error={errors.handle}
              onChange={onHandleChange}
            />
            {
              loader
                ? <button className="btn btn-lg btn-success btn-block mb-2 mt-4" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Changing Handle...
                  </button>
                : <button type="submit" className="btn btn-lg btn-success btn-block mb-2 mt-4">Change</button>
            }                         
          </form>
          <div className='text-center'>
            <p><Link to='/me'>Skip it</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeHandle

