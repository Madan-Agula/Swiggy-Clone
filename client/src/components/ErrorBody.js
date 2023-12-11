import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorBody() {
    const error = useRouteError()
  return (
    <div className='d-flex justify-center m-5'>
        <h1>Oop's Something went wrong ({error.status} {error.statusText})
        Refresh Page</h1>
    </div>
  )
}

export default ErrorBody