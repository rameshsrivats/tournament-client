import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import { getToken } from '../../utils/auth-utils'

const Landing = () => {
  const token = getToken()
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    return <Redirect to='/me'/>
  } else {
    return <Redirect to='/login'/>  
  }
}

export default Landing
