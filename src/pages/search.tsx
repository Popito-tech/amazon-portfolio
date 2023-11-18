import { useRouter } from 'next/router';
import Link from 'next/link'
import SearchProducts from '@/components/SearchProducts';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StateProps, StoreProduct } from '../../type';

const SearchPage = () => {
    const router = useRouter();
    const { q } = router.query;
    const {data}=useSelector((state:StateProps)=>state.next);
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    // COMPARING QUERY TO DATA
    useEffect(() => {
      if (q) {
        if (Array.isArray(q)) {
          const filtered = data.filter((item: StoreProduct) =>
            q.some(subQ => item.title.toLowerCase().includes(subQ.toLowerCase()))
          );
          setFilteredProducts(filtered);
        } else {
          const filtered = data.filter((item: StoreProduct) =>
            item.title.toLowerCase().includes(q.toLowerCase())
          );
          setFilteredProducts(filtered);
        }
      }
    }, [q]);
  return (
    <div className='max-w-screen-lg mx-auto bg-white'>
      <h1>Search Results for: {q}</h1>
      {filteredProducts.length > 0 ? (
        <>
      {
      filteredProducts.map((item:StoreProduct) => (
          <Link
          key={item.id}
          className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4 hover:bg-gray-300"
          href={{
            pathname: `${item.id}`,
          query: {
            id: item.id,  
            category: item.category,
            description: item.description,
            image: item.image,
            price: item.price,
            title: item.title}}}>
          <SearchProducts item={item} />
        </Link>
          ))}
        </>
      ) : (
        <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
          <p className="text-xl font-semibold animate-bounce">
            Nothing is matches with your search keywords. Please try again!
          </p>
        </div>)}
    </div>
  );
};

export default SearchPage;