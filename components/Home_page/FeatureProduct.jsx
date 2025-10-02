import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FeatureProduct = ({ featuredProduct }) => {
  return (
    <div className='pb-[100px]'>
      <div className="container">
        <div className="">
          <h3 className='text-[35px] font-semibold text-black mb-5'>Featured Product</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[20px]">
          {featuredProduct.map((Item, index) => {
            let finalPrice = Item.price;

            if (Item.discountType === "percentage") {
              finalPrice = Item.price - (Item.price * Item.discount) / 100;
            } else if (Item.discountType === "fixed") {
              finalPrice = Item.price - Item.discount;
            }

            return (
              <div key={index} className="p-[10px] shadow rounded-xl group bg-white">
                <div className="w-full h-[200px] overflow-hidden rounded-lg">
                  <Image
                    className='w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-300'
                    src={Item.images[0]}
                    width={500}
                    height={500}
                    alt={Item.name}
                  />
                </div>
                <div className="text-center mt-5">
                  <span className='text-[15px] font-normal'>{Item.name}</span>

                  {/* Price display */}
                  {finalPrice !== Item.price ? (
                    <div className="mt-2 flex items-center justify-center gap-5">
                      <h4 className='text-[18px] font-semibold text-red-600'>
                        ${finalPrice.toFixed(2)}
                      </h4>
                      <p className='text-[14px] text-gray-500 line-through'>
                        ${Item.price}
                      </p>
                    </div>
                  ) : (
                    <h4 className='text-[22px] font-semibold mt-2'>${Item.price}</h4>
                  )}
                <div className='text-center'>
  
                  {/* Discount label */}
                  {Item.discountType === "percentage" && (
                    <p className='text-[14px] text-green-600 mt-1'>
                      Save {Item.discount}%
                    </p>
                  )}

                  {Item.discountType === "flat" && (
                    <p className='text-[14px] text-green-600 mt-1'>
                      Save ${Item.discount}
                    </p>
                  )}

                </div>
                  <Link
                    className='text-[15px] font-medium px-6 py-3 bg-black text-white block mt-3 rounded-lg'
                    href={`/product/${Item.slug}`}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FeatureProduct
