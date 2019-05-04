import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import TextInputGroup from './TextInputGroup'

const ChangePass = (props) => {

  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loader, setLoader] = useState(false)
  const [success, setSuccess] = useState(false)

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
    errors.password=''
  }

  const onDone = () => {
    props.history.push('/me')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const userData = {
      password
    } 
    setLoader(true)
    try {
      await axios.patch('/api/users/password', userData)
      setLoader(false)
      setSuccess(true)
    } catch (err) {
      setLoader(false)
      setErrors(err.response.data)
    }
  }

  return (
    <div className="container auth-form-container" >
      <div className="row align-items-center justify-content-center auth-form-div" >
        <div className="col-sm-10 col-md-8 col-lg-6 bg-white rounded p-3">
          {
            success
              ? <p className=' text-muted text-center'>Your new password is still XXXXXXXX</p>
              : <p className=' text-muted text-center'>Your current password is er... XXXXXXXX</p>
          }
          {
            success
              ? <h1 className='text-center mt-0 mb-3'>Your password has been changed</h1>
              : <h1 className='display-4 text-center mt-0 mb-3'>Password</h1>
          }
          <form noValidate className='p-3' onSubmit={onSubmit}>
            {
              !success && (
                <TextInputGroup
                type='password'
                placeholder='Pick a new password'
                value={password}
                error={errors.password}
                onChange={onPasswordChange}
              />
              )
            } 
            { !success && 
              (
                loader
                  ? <button className="btn btn-lg btn-success btn-block mb-2 mt-4" type="button" disabled>
                      <span className="spinner-border spinner-border-sm float-left" role="status" aria-hidden="true"></span>
                      Changing Password...
                    </button>
                  : <button type="submit" className="btn btn-lg btn-success btn-block mb-2 mt-4">Change</button>
              )  
            }
          </form>
          { !success && 
            <div className='text-center'>
              <p><Link to='/me'>Skip it</Link></p>
            </div>
          }
          { success &&
              <button type="button" onClick={onDone} className="btn btn-lg btn-success btn-block mb-2 ">Done</button>         
          }
        </div>
      </div>
    </div>
  )
}

export default ChangePass
