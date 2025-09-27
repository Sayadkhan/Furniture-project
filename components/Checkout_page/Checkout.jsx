import React from 'react'
import CheckoutLeftSide from './CheckoutLeftSide'
import CheckOutRightSide from './CheckOutRightSide'

const Checkout = () => {
  return (
    <>
    <div className="py-[100px]">
        <div className="container">
            <div className="flex justify-between">
                <div className="w-[56%]">
                    <CheckoutLeftSide />
                </div>
                <div className="w-[40%]">
                    <CheckOutRightSide />
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Checkout