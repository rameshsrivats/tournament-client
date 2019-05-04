import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div>
      <div class="container bg-white mt-3 rounded">
        <h1 class="text-center p-3">Admin</h1>
      </div>
      <div className="container bg-white list-group mt-2 rounded">
        <Link to='/admin/uploadteams' className="list-group-item list-group-item-action ">Upload Teams</Link>
        
      </div>
    </div>
    
  )
}

export default Admin
