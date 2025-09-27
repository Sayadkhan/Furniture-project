import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

const ShopCard = ({product}) => {
  return (
    <div>
        <Card key={product._id} className="shadow-md rounded-lg">
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
            </CardHeader>              
            <CardContent>
                <p className="text-lg font-semibold mt-2">${product.price}</p>
                <p className="text-sm text-gray-600 mt-1">
                {product.category?.name} → {product.subcategory?.name}
                </p>

                {/* Colors */}
                <div className="mt-3">
                <p className="text-sm font-medium">Colors:</p>
                <div className="flex gap-2 mt-1">
                    {product.variants?.map(
                    (variant, i) =>
                        variant.attributes?.color && (
                        <span
                            key={i}
                            className="w-6 h-6 rounded-full border"
                            style={{
                            backgroundColor:
                                variant.attributes.hexCode || "#ccc",
                            }}
                            title={variant.attributes.color}
                        ></span>
                        )
                    )}
                </div>
                </div>

                {/* Sizes */}
                <div className="mt-3">
                <p className="text-sm font-medium">Sizes:</p>
                <div className="flex gap-2 mt-1">
                    {[...new Set(
                    product.variants
                        ?.map((v) => v.attributes?.size)
                        .filter(Boolean)
                    )].map((size, i) => (
                    <span
                        key={i}
                        className="px-2 py-1 border rounded text-xs"
                    >
                        {size}
                    </span>
                    ))}
                </div>
                </div>
                
                <Button className="mt-4 w-full">
                    <Link href="/productDetails"> View Details</Link>                   
                </Button>
            </CardContent>
        </Card>
    </div>
  )
}

export default ShopCard