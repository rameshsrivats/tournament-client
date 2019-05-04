import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import TextInputGroup from './TextInputGroup'

const Forgot = (props) => {

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [loader, setLoader] = useState(false)
  const [success, setSuccess] = useState(false)

  const onEmailChange = (e) => {
    setEmail(e.target.value)
    errors.email=''
  }

  const onDone = () => {
    props.history.push('/')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const userData = {
      email
    } 
    setLoader(true)
    try {
    // Once email is implemented there will be no response
        const response = await axios.put('/api/users/email', userData)
        console.log(response.data)
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
              ? <p className=' text-muted text-center'>You can close this window</p>
              : <p className=' text-muted text-center'>We'll send you an email to reset your password</p>
          }
          {
            success
              ? <h1 className='text-center mt-0 mb-3'>Check your email</h1>
              : <h1 className='display-4 text-center mt-0 mb-3'>Forgot?</h1>
          }
          <form noValidate className='p-3' onSubmit={onSubmit}>
            {
              !success && (
                <TextInputGroup
                type='email'
                placeholder='Your registered email'
                value={email}
                error={errors.email}
                onChange={onEmailChange}
              />
              )
            } 
            { !success && 
              (
                loader
                  ? <button className="btn btn-lg btn-success btn-block mb-2 mt-4" type="button" disabled>
                      <span className="spinner-border spinner-border-sm float-left" role="status" aria-hidden="true"></span>
                      Checking Email...
                    </button>
                  : <button type="submit" className="btn btn-lg btn-success btn-block mb-2 mt-4">Submit</button>
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

export default Forgot
