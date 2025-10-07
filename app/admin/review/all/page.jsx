import React, { Suspense } from 'react'
import ReviewPage from './components/ReviewPage'

const page = () => {
  return (
    <div>
    <Suspense fallback={<div>Get All The Review.....</div>}> 
        <ReviewPage/>
    </Suspense>
    </div>
  )
}

export default page
