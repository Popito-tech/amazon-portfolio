export interface ProductProps{
  id:number;
  title:string;
  description:string;
  image:string;
  price:number;
}

export interface StoreProduct{
    category:string;
    description:string;
    image:string;
    price:number;
    title:string;
    id:number;
    quantity:number,
}

export interface StateProps {
    productData: [];
    favoriteData: [];
    userInfo: null | string;
    next: any;
  }

  export interface OrderHistoryType {
    id: string;
    amount: number;
    images: string[];
    items: number[];
    timestamp:string;
  }

  export interface OrdersType {
    id: string;
    amount: number;
    images: string[];
    items: number[];
    length:number;
    timestamp:any;
    map:any;
  }
