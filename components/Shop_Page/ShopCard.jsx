import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

const ShopCard = ({product}) => {
  return (
    <div>
        <Card key={product._id} className="shadow-md rounded-lg">
            <div className="w-full h-[200px] mb-3">
                <Image className='w-full h-full object-cover' src={product.images[0]} width={400} height={400} alt='' />
            </div>
            <CardHeader>
                <CardTitle className="text-[22px] capitalize">{product.name}</CardTitle>
            </CardHeader>              
            <CardContent>
                <p className="text-lg font-semibold">${product.price}</p>
                {/* <p className="text-[16px] text-gray-600 mt-1">
                {product.category?.name} → {product.subcategory?.name}
                </p> */}
            <Link href={`/product/${product.slug}`}> 
                <Button className="mt-4 w-full cursor-pointer">
                    View Details
                </Button>
            </Link>                   
              
            </CardContent>
        </Card>
    </div>
  )
}

export default ShopCard