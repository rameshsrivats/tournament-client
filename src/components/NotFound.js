import React from 'react'

const NotFound = (props) => {

    const onDone = () => {
        props.history.push('/')
    }

    return (
        <div className="container auth-form-container" >
          <div className="row align-items-center justify-content-center auth-form-div" >
            <div className="col-sm-10 col-md-8 col-lg-6 bg-white rounded p-3">
                  <h1 className='text-center mt-0 mb-3'>Page not found</h1>
                  <button type="button" onClick={onDone} className="btn btn-lg btn-success btn-block mb-2 ">Home</button>         
            </div>
          </div>
        </div>
    )
}

export default NotFound
