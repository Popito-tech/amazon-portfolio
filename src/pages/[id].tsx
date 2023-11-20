import { addToCart } from '@/redux/nextSlice';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';

function DynamicPage() {
    const [product, setProduct]=useState<any>({});
    const router = useRouter();
    const id = parseInt(product.id)
    const dispatch=useDispatch();

    {/* LOADING PRODUCTS */}
    useEffect(()=>{ 
        setProduct(router.query);
    }, [router.query])
    
    {/* DEFINING THE CURRENCY USED*/}
    const f = new Intl.NumberFormat('en-us',{
      currency:'USD',
      style: 'currency',
    });

  return (
    <div className='max-w-screen-xl mx-auto px-4 py-4 md:py-10'>
      <div className='w-full grid md:grid-cols-3 gap-3 bg-white rounded-lg'>

        {/* PRODUCT IMAGE */}
        <div className='flex flex-items-center justify-center bg-white rounded-lg relative group overflow-hidden'>
          <Image 
          className='w-auto h-80 mx-auto' 
          src={product.image} 
          alt='product image' 
          width={500} height={200}/>
        </div>
        
        {/* TITLE, DESCRIPTION, PRICE */}
        <div className='md:col-span-2 flex flex-col gap-3 justify-center p-4'>
          <h1 className='text-xl md:text-3xl tracking-wide  font-semibold'>{product.title}</h1>
          <p className='text-sm text-gray-600'>{product.description}</p>
          <div>
          <p className='text-base text-gray-600 flex items-center gap-1'>Price:<span className='text-lg text-amazon_blue font-semibold'>{f.format(product.price)}</span></p>
          {/* BUTTON ADD TO CART */}
          <button 
          onClick={()=>dispatch(addToCart({
          id:id,
            }))}
            className='w-full md:w-72 button h-10 mt-5'>add to cart</button>
          </div>
        </div>

        </div>
    </div>
  )
}

export default DynamicPage