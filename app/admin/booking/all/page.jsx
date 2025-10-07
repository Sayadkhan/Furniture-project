import React, { Suspense } from 'react'
import AllBooking from './components/AllBooking'

const page = () => {
  return (
    <div>
      <Suspense fallback={<div className='w-full flex items-center justify-center'>Loading Booking Data.....</div>}>
        <AllBooking/>
      </Suspense>
    </div>
  )
}

export default page
