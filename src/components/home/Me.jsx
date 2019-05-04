import React from 'react'

import { getUser } from '../../utils/auth-utils'

const Me = () => {
  const user = getUser()
  return (
    <div>
      <h1>Hello {user.handle}</h1>
    </div>
  )
}

export default Me
