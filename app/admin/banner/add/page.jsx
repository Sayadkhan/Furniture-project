import React, { Suspense } from 'react'
import BannerPage from './components/BannerAddPage'

const page = () => {
  return (
    <div>
     <Suspense fallback={<>Loading Banner Data...</>}>
       <BannerPage/>
     </Suspense>
    </div>
  )
}

export default page
