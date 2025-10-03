import React, { Suspense } from 'react'
import ServerPage from './ServerPage'

const page = () => {
  return (
    <div>
    <Suspense fallback={<>Loading data....</>}>
        <ServerPage/>
    </Suspense>
    </div>
  )
}

export default page
