import { resetCart } from "@/redux/nextSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";



const Success = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(resetCart());
  }, [dispatch]);
  return (
    <div className="flex flex-col gap-2 items-center justify-center py-20">
      <h1 className="text-2xl text-hoverBg font-semibold">
        Thank you for shopping in amazon
      </h1>
      <Link
        className="text-lg text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600 duration-300"
        href={"/"}
      >
        <p>Continue Shopping</p>
      </Link>
    </div>
  )
}

export default Success