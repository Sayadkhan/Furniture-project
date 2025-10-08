import React from 'react'
import CurtainsDetails from '../components/CurtainsDetails'

const page = async ({params}) => {
  const {id} = await params
  return (
    <div className='min-h-screen'>
      <CurtainsDetails id={id}/>
    </div>
  )
}

export default page
