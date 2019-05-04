import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios'

import { AuthContext } from './contexts'

import { getToken } from './utils/auth-utils'

import PrivateRoute from './routers/PrivateRoute'
import UnauthRoute from './routers/UnauthRoute'

import Admin from './components/admin/Admin'
import ChangeHandle from './components/auth/ChangeHandle'
import ChangePass from './components/auth/ChangePass'
import Forgot from './components/auth/Forgot'
import Header from './components/Header'
import Landing from './components/auth/Landing'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Me from './components/home/Me'
import NotFound from './components/NotFound'
import Register from './components/auth/Register'
import ResetPass from './components/auth/ResetPass'
import SquadRules from './components/static/SquadRules'
import UploadTeams from './components/admin/UploadTeams'

function App() {

  const [auth, setAuth] = useState(false)

  useEffect(()=>{
    const token = getToken()
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      setAuth(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/squad' component={SquadRules} /> 
          
          <UnauthRoute exact path='/login' component={Login} />
          <UnauthRoute exact path='/register' component={Register} />
          <UnauthRoute exact path='/forgot' component={Forgot} />
          <UnauthRoute exact path='/resetpass/:code' component={ResetPass} />
          
          <PrivateRoute exact path='/logout' component={Logout} />
          <PrivateRoute exact path='/changepass' component={ChangePass} />
          <PrivateRoute exact path='/handle' component={ChangeHandle} />
          <PrivateRoute exact={true} path='/me' component={Me} />

          <PrivateRoute exact path='/admin' component={Admin} />
          <PrivateRoute exact path='/admin/uploadTeams' component={UploadTeams} />

          
          <Route component={NotFound} />
        </Switch>

        
      </Router>
    </AuthContext.Provider>
    
  )
}

export default App;
