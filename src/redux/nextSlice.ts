import { createAsyncThunk, createSlice, PayloadAction  } from '@reduxjs/toolkit'
import { StoreProduct, ProductProps, Id } from '../../type';
import { channel } from '@/components/broadcastChannel';

export const fetchTodo = createAsyncThunk<ProductProps[]>('fetchTodo', async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
  return data.map((item:ProductProps) => ({ ...item, quantity: 1 }));
} catch (error) {
  throw new Error(`Failed to fetch todo items: ${error}`);
} // Add quantity to each item
});

export interface NextState {
    cartData: StoreProduct[];
    favoriteData: StoreProduct[];
    allProducts: StoreProduct[];
    userInfo: null | string;
    data:StoreProduct[];
  }

const initialState:NextState={
    cartData:[],
    data:[],
    favoriteData:[],
    allProducts:[],
    userInfo:null,
}

export const nextSlice = createSlice({
    name:'next',
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<Id>) => {
            const productWanted = state.cartData.find(
              (item: StoreProduct) => item.id === action.payload.id
            );
            if (typeof productWanted === 'undefined') {
              const newProduct = state.data.find(
                (item: StoreProduct) => item.id === action.payload.id
              )
              if(newProduct){
                state.cartData.push(newProduct);
              }
            } else {
              productWanted.quantity += 1;
            }
          },
          increaseQuantity: (state, action) => {
            const productWanted = state.cartData.find(
              (item: StoreProduct) => item.id === action.payload.id
            );
            productWanted && productWanted.quantity++;
          },
          decreaseQuantity: (state, action) => {
            const productWanted = state.cartData.find(
              (item: StoreProduct) => item.id === action.payload.id
            );
            if (productWanted?.quantity === 1) {
              productWanted.quantity = 1;
            } else {
              productWanted!.quantity--;
            }
          },
          deleteProduct: (state, action) => {
            state.cartData = state.cartData.filter(
              (item) => item.id !== action.payload
            );
          },
          resetCart: (state) => {
            state.cartData = [];
          },
          addUser: (state, action) => {
            state.userInfo = action.payload;
          },
          removeUser: (state) => {
            state.userInfo = null;
          },
    },
    extraReducers: (builder)=>{
      builder.addCase(fetchTodo.fulfilled, (state, action)=>{
          state.data = action.payload as StoreProduct[];
      });
      builder.addCase(fetchTodo.rejected, (state, action) => {
        console.error(`Fetch todo items failed: ${action.error.message}`);
      });
  }
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  addUser,
  removeUser,
} = nextSlice.actions;
export default nextSlice.reducer;