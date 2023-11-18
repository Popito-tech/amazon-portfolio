import { addToCart, fetchTodo } from '@/redux/nextSlice';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ProductProps } from '../../type';

interface Props{
  storeProduct:ProductProps[];
}

const Products = ({storeProduct}:Props) => {

  {/* TRIGERING FETCHTODO TO SET UP THE STORE LOGIC*/}
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodo() as any);
}, []);

  {/* DEFINING THE CURRENCY USED*/}
  const currency = new Intl.NumberFormat('en-us',{
    currency:'USD', 
    style: 'currency', 
  });

  return (    
    <div className='w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'>

      {storeProduct.map(({id, title, price, description, image})=>(
        <div key={id} className='w-full bg-white  text-black p-4 border border-gray-300 rounded-lg group overflow-hidden'>

          {/* PRODUCT IMAGE */}
          <div className='cursor-pointer'>
            <Link href={{pathname:`/${id}`, query:{
            id:id, title:title, price:price,
            description:description, image:image,}}}>
              <Image className='w-auto h-48 mx-auto' 
              width={300} height={300} 
              src={image} alt='productImage'/>
            </Link>
          </div>

          <hr/>

          <div className='px-4 py-3 flex flex-col gap-1'>
            {/* TITLE, PRICE, DESCRIPTION */}
            <p className='cursor-pointer text-base font-medium line-clamp-1'>{title}</p>
            <p className='flex items-center gap-2'>
              <span className='text-amazon_blue font-semibold'>{currency.format(price)}</span>
            </p>
            <p className='text-xs text-gray-600 text-justify line-clamp-3'>{description}</p>
            {/* BUTTON ADD TO CART */}
            <button 
            className='h-10 button'
            onClick={()=>dispatch(addToCart({
              id:id,
            }))}>add to cart</button>
          </div>
        </div>
  ))
  }
  </div>
  )
}

export default Products