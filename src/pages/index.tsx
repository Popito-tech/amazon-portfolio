import { Inter } from 'next/font/google'
import Banner from '@/components/Banner'
import Products from '@/components/Products';
import { ProductProps } from '../../type';


const inter = Inter({ subsets: ['latin'] })

interface Props{
  storeProductProp:ProductProps[];
}

export default function Home({storeProductProp}:Props) {
  return (
    <main>
      <div className='max-w-screen-2xl mx-auto'>
        <Banner/>
          <div className='relative md:-mt-20 lgl:-mt-32 xl:-mt-60 z-20 mb-10'>
            <Products storeProduct={storeProductProp}/>
          </div>
      </div>
    </main>
  )
}

export const getServerSideProps = async () =>{
  const res = await fetch('https://fakestoreapi.com/products');
  const storeProductProp = await res.json();
  return {
    props:{
      storeProductProp,
    },
  };
}
