import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    rating: { rate: number; count: number };
  }

  interface ProductState {
    items: Product[];
    loading: boolean;
    error: string;
    searchQuery: string;
    sortOption: string;
    category: string;
  }

  export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  });

  const initialState: ProductState = {
    items: [],
    loading: false,
    error: "",
    searchQuery: "",
    sortOption: "",
    category: "",
  };

  const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      setSearchQuery: (state, action) => {
        state.searchQuery = action.payload;
      },
      setSortOption: (state, action) => {
        state.sortOption = action.payload;
      },
      setCategory: (state, action) => {
        state.category = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state) => {
          state.loading = false;
          state.error = "Failed to fetch products";
        });
    },
  });

  export const { setSearchQuery, setSortOption, setCategory } = productSlice.actions;
  export default productSlice.reducer;