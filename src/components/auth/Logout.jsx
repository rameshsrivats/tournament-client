import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import { deleteToken } from '../../utils/auth-utils'
import { AuthContext } from '../../contexts'

const Logout = () => {
  const { setAuth } = useContext(AuthContext)
  delete axios.defaults.headers.common['Authorization']
  deleteToken()
  setAuth(false)
  return <Redirect to='/login'/>
}

export default Logout