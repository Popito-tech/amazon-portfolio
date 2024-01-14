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
                    <Link key={id} href={{pathname:`/${id}`, query:{
                      id:id, title:title, price:price,
                      description:description, image:image,}}}>
        <div key={id} className='w-full bg-white  text-black p-4 border-2 border-gray-400 rounded-lg group overflow-hidden hover:border-black'>

          {/* PRODUCT IMAGE */}
          <div className='cursor-pointer'>
              <Image className='w-auto h-48 mx-auto my-8' 
              width={300} height={300} 
              src={image} alt='productImage'/>
          </div>



          <div className='px-0 py-3 flex flex-col gap-1'>
            {/* TITLE, PRICE, DESCRIPTION */}
            <p className='cursor-pointer text-base line-clamp-1 mb-2'>{title}</p>
            <p className='flex items-center gap-2'>
              <span className='text-amazon_blue font-semibold mb-0'>{currency.format(price)}</span>
            </p>
            {/* BUTTON ADD TO CART */}
          </div>
          
        </div>
        </Link>
  ))
  }
  </div>
  )
}

export default Products