import { OrderHistoryType } from "../../type";




function OrderHistory({id, amount, images, items, timestamp}:OrderHistoryType) {
    const f = new Intl.NumberFormat('en-us',{
        currency:'USD',
        style: 'currency',
      });
  return (
    <div className="relative border rounded-md bg-white">
        {/* ORDER INFO */}
        <div className="flex items-center space-x-10 p-5 bg-gray-50 text-sm text-gray-600 ">
            <div>
            <p className="font-bold text-xs">ORDER PLACED</p>
            <p>THE {timestamp}</p>
            </div>
            <div>
                <p className="text-xs font-bold">TOTAL</p>
                <p>{f.format(amount)}</p>
            </div>
            <p className="text-sm whitespace-nowrap sm:text-lg self-end flex-1 text-right text-blue-500">{items.length}items</p>
            <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">ORDER # {id}</p>
            
        </div>

        {/* ORDER IMAGE */}
        <div className="p-5 sm:px-10">
            <div className="flex space-x-6 overflow-x-auto">
                {images.map((image:string, index:number) => (
                    <img key={index} src={image} alt="" className="object-contain h-36 w-36"></img>
                ))}
            </div>
        </div>
    </div>
  )
}

export default OrderHistory