import Image from 'next/image'
import logo from '../../../images-ama-typscript/logo.png'
import cartIcon from '../../../images-ama-typscript/cartIcon.png'
import {BiCaretDown} from 'react-icons/bi'
import {HiOutlineSearch} from 'react-icons/hi'
import {SlLocationPin} from 'react-icons/sl'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { addUser } from '@/redux/nextSlice'
import { useRouter } from "next/router";
import SearchProducts from '@/components/SearchProducts'
import { StateProps, StoreProduct } from '../../../../type'

const Header = () => {
  const { data: session } = useSession()
  const [allData, setAllData] = useState([]);
  const dispatch = useDispatch();
  const {cartData, userInfo, data}=useSelector((state:StateProps)=>state.next);
  const [cartItemsQuantity, setcartItemsQuantity] = useState(0);

    {/* DEFINING NUMBER OF ITEMS IN THE CART */}
    useEffect(() => {
      let quantityStacker = 0;
      cartData.map((item:StoreProduct) => {
        quantityStacker += item.quantity;
        return;
      });
      setcartItemsQuantity(quantityStacker);
    }, [cartData]);

    {/* GETTING LOGGED USER INFO */}
    useEffect(() => {
      if (session) {
        dispatch(
          addUser({
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image,
          })
        );
      }
    }, [session]);

    {/* GETTING ALL PRODUCTS FROM THE STORE */}
    useEffect(() => {
        setAllData(data)
    }, [data]);

              // Search area
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();

  {/* LAND TO THE SEARCH PAGE */}
  const ppp = (e:any) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
    setSearchQuery("");
  };

  {/* SEARCHFIELD DATA */}
  useEffect(() => {
    const filtered = allData.filter((item:StoreProduct) =>
      item.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className='w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50'>
      <div className='h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4'>
        {/* AMAZON LOGO */}
        <Link href={'/'} className='px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]'>
        <Image className='w-28 object-cover mt-1' src={logo} alt='logoImg'/>    
        </Link>

      {/* ADRESS LOGO */}
      <div className='px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden xl:inline-flex gap-1'>
        <SlLocationPin/>
        <div className='text-xs'>
          <p>Deliver to</p>
          <p className='text-white font-bold uppercase'>usa</p>
        </div>
      </div>

      <div className='flex-1 h-10 hidden md:inline-flex items-center justify-between relative'>
        {/* GETTING QUERY */}
        <form 
        className='flex-1 h-10 hidden md:inline-flex items-center justify-between relative'
        onSubmit={ppp}>
          <input 
          onChange={(e)=>setSearchQuery(e.target.value)}
          value={searchQuery}
          className='w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow ' 
          type='text' 
          placeholder='Search products'/>

          <button  
          type="submit"
          className='w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-r-md'>
            <HiOutlineSearch/>
          </button>
        </form>
          {/* ========== Searchfield ========== */}
          {searchQuery && (
            <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-white rounded-lg overflow-y-scroll cursor-pointer text-black">
              {/* PRODUCT FOUND */}
              {filteredProducts.length > 0 ? (
                <>
                  {searchQuery &&
                    filteredProducts.map((item:StoreProduct) => (
                      // {/* LINK TO DYNAMIC PAGE */}
                      <Link
                      key={item.id}
                      className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                      href={{
                        pathname: `${item.id}`,
                        query: {
                          id: item.id,
                          category: item.category,
                          description: item.description,
                          image: item.image,
                          price: item.price,
                          title: item.title,
                          },
                        }}
                        onClick={() => setSearchQuery("")}>
                        <SearchProducts item={item} />
                      </Link>
                    ))}
                </>
              ) : (
                // {/* NO PRODUCTS FOUND */}
                <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                  <p className="text-xl font-semibold animate-bounce">
                    Nothing is matches with your search keywords. Please try
                    again!
                  </p>
                </div>
              )}
            </div>
          )}
          {/* ========== END Searchfield ========== */}
      </div>
      {userInfo?
      <div className='flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1'>

        {/* AVATAR USER */}
        {userInfo.image 
        ? <img src={userInfo.image} alt='userImage' className='w-8 h-8 rounded-full object-cover'/> 
        : <div/>}

        {/* USER NAME AND EMAIL */}
        <div className='text-xs text-gray-100 flex flex-col justify-between'>
          <p className='text-white font-bold'>{userInfo.name}</p>
          <p>{userInfo.email}</p>
        </div>
      </div>

      :
      // {/* SIGN IN */}
      <Link href={'/account/login'} className='text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]'>
        <p>Hello, sign In</p>
        <p className='text-white font-bold flex itens-center'>Account & List <span><BiCaretDown/></span></p>
      </Link>}

      {/* ORDER HISTORY */}
      <Link 
      href={'/ordersHistory'}
      className='text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative'>
        <p>Orders</p>
        <p className='text-white font-bold'>History</p>
      </Link>

      {/* CART PAGE */}
      <Link 
      href={'/cart'}
      className='flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative'>
        <Image className='w-auto object-cover h-8' src={cartIcon} alt='cartImg'/>
          <p className='text-xs  text-white font bold mt-3'>Cart</p>
          <span className='absolute text-amazon_yellow text-sm top-2 left-[29px] font-semibold'>{cartItemsQuantity}</span>
      </Link>
           
      </div>
    </div>
  )
}


export default Header