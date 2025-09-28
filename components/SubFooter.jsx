import Image from 'next/image'
import React from 'react'
import PaymentImg from "../public/payment.png"

const SubFooter = () => {
  return (
    <div>
        <div className="pt-10">
            <div className="block lg:flex justify-between">
                <p className='text-white'>© 2025 Furnista_Default - WordPress Theme by Avanam</p>
                <div className="mt-3">
                    <Image src={PaymentImg} alt='' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default SubFooter