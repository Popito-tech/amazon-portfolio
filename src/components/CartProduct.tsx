import Image from "next/image";
import React from "react";
// import FormattedPrice from "./FormattedPrice";
import { LuMinus, LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { decreaseQuantity, deleteProduct, increaseQuantity } from "@/redux/nextSlice";
import { StoreProduct } from "../../type";

interface Props{
  item:StoreProduct;
}

function CartProduct({item}:Props) {
    const f = new Intl.NumberFormat('en-us',{
        currency:'USD',
        style: 'currency',
      });
    const dispatch = useDispatch();
  return (
    <div className="bg-white rounded-lg flex items-center gap-4">
      {/* PRODUCT IMAGE */}
      <Image
        className="object-cover"
        width={150} 
        height={150}
        src={item.image}
        alt="productImage"/>
      <div className="flex space-x-24 items-center px-2 gap-4">
        <div className="flex-grow gap-1 ">
          {/* PRODUCT INFO */}
          <p className="text-lg font-semibold text-amazon_blue">{item.title}</p>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="text-sm text-gray-600">
            Unit Price{" "}
            <span className="font-semibold text-amazon_blue">
            {f.format(item.price)}
            </span>
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center mt-1 justify-between border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300">
              {/* INCREASE BUTTON */}
              <span
                onClick={() =>
                  dispatch(
                    increaseQuantity({
                        id:item.id,
                        title:item.title,
                        price:item.price,
                        description:item.description,
                        image:item.image,
                        quantity:1,
                    })
                  )
                }
                className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
              >
                <LuPlus />
              </span>
              <span>{item.quantity}</span>
              {/* DECREASE BUTTON */}
              <span
                onClick={() =>
                  dispatch(
                    decreaseQuantity({
                        id:item.id,
                        title:item.title,
                        price:item.price,
                        description:item.description,
                        image:item.image,
                        quantity:1,
                    })
                  )
                }
                className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
              >
                <LuMinus />
              </span>
            </div>
            {/* DELETE BUTTON */}
            <div
              onClick={() => dispatch(deleteProduct(item.id))}
              className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300"
            >
              <IoMdClose className="mt-[2px]" /> <p>remove</p>
            </div>
          </div>
        </div>
        {/* PRICE X QUANTITY */}
        <div className="text-lg font-semibold text-amazon_blue ml-auto">
        {f.format(item.price* item.quantity)}
        </div>
      </div>
    </div>
  )
}

export default CartProduct