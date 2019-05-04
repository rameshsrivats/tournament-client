import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import TextInputGroup from './TextInputGroup'
import { setToken } from '../../utils/auth-utils'
import { AuthContext } from '../../contexts'

const Register = (props) => {

  const { setAuth } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loader, setLoader] = useState(false)

  const onEmailChange = (e) => {
    setEmail(e.target.value)
    errors.email=''
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
    errors.password = ''
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const userData = {
      email,
      password
    } 
    setLoader(true)
    try {
      const response = await axios.post('/api/users', userData)
      setLoader(false)
      const token = response.data.token
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      setToken(token)
      setAuth(true)
      props.history.push('/handle')
    } catch (err) {
      console.log(err.response.data)
      setLoader(false)
      setErrors(err.response.data)
    }
  }
  return (
    <div className="container auth-form-container" >
      <div className="row align-items-center justify-content-center auth-form-div" >
        <div className="col-sm-10 col-md-8 col-lg-6 bg-white rounded p-3">
          <p className=' text-muted text-center'>Get set for some fantasy fun</p>
          <h1 className='display-4 text-center mt-0 mb-3'>Register</h1>
          <form noValidate className='p-3' onSubmit={onSubmit}>
            <TextInputGroup
              type='email'
              placeholder='Enter your email'
              value={email}
              error={errors.email}
              onChange={onEmailChange}
            />
            <TextInputGroup
              type='password'
              placeholder='Pick a password'
              value={password}
              error={errors.password}
              onChange={onPasswordChange}
            />
            {
              loader
                ? <button className="btn btn-lg btn-success btn-block mb-2 mt-4" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Registering...
                  </button>
                : <button type="submit" className="btn btn-lg btn-success btn-block mb-2 mt-4">Register</button>
            }                         
          </form>
          <div className='text-center'>
            <p>Already have an account? <Link to='/login'>Login here.</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

