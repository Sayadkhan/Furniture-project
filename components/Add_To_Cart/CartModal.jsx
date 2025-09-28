import { X } from 'lucide-react'
import React from 'react'

const CartModal = ({openCart, setOpenCart}) => {
  return (
    <div>
       
      {openCart && (
        <div
          onClick={() => setOpenCart(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-xl z-50 transform transition-transform duration-300
        ${openCart ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b mb-10">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button onClick={() => setOpenCart(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* <div className="p-4 flex items-center border-b">
          <Image
            src={activeImage || "/placeholder.png"}
            alt="cart item"
            width={60}
            height={60}
            className="border rounded"
          />
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium">{product.name}</p>
            {selectedVariant && (
              <p className="text-xs text-gray-500">
                {selectedVariant.attributes.color} |{" "}
                {selectedVariant.attributes.size}
              </p>
            )}
            <p className="text-sm text-gray-600">
              {numberCount} × ${discountedPrice}
            </p>
          </div>
          <button className="text-red-500 text-xl">&times;</button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Subtotal:</span>
            <span className="font-semibold">
              ${discountedPrice * numberCount}
            </span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-800">
              View Cart
            </button>
            <Link
              href="/checkout"
              className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800 text-center"
            >
              Checkout
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default CartModal
