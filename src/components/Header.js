import React, {useContext} from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../contexts'

import { getUser } from '../utils/auth-utils'




const Header = () => {

  const { auth } = useContext(AuthContext)
  let isAdmin = false
  if (auth) {
    const { role } = getUser()
    if (role === 'admin') {
       isAdmin = true
    } 
  }
  
  return (
    <nav className="navbar navbar-default navbar-expand-md navbar-dark">
      <div className="container">
        <Link to='/' className="navbar-brand">Tournament Fantasy</Link>  
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainmenu">
          <span style={{color: 'yellow'}}>
            <i class="fas fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="mainmenu">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item" data-toggle="collapse" data-target="#mainmenu">
              <Link to='/squad' className='nav-link text-warning'>Squad</Link>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target="#mainmenu">
              <Link to='/points' className='nav-link text-warning'>Points</Link>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target="#mainmenu">
              <Link to='/subs' className='nav-link text-warning'>Subs</Link>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target="#mainmenu">
              <Link to='/schedule' className='nav-link text-warning'>Schedule</Link>
            </li>
            {
              isAdmin && (
                <li className="nav-item" data-toggle="collapse" data-target="#mainmenu">
                  <Link to='/admin' className='nav-link text-warning'>Admin</Link>
                </li>
              )
            }
            {
              auth && (
                <span data-toggle="collapse" data-target="#mainmenu">
                  <li className="nav-item dropdown">
                    <button className="dropdown-toggle btn btn-success py-0  mt-2" id="navbarDropdown" data-toggle="dropdown">
                      Actions
                    </button>

                    <div className="dropdown-menu dropdown-menu-right">
                      <Link to='/handle' className="dropdown-item">Change Username</Link>
                      <Link to='/changepass' className="dropdown-item">Change Password</Link>
                      <div className="dropdown-divider"></div>
                      <Link to='/logout' className="dropdown-item">Logout</Link>
                    </div>
              ``  </li>                
                </span>
                
              )
            }
          </ul> 
        </div>
      </div>
    </nav>
  )
}

export default Header
