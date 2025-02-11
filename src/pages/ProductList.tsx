import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSearchQuery, setSortOption, setCategory } from "../slices/productSlice";
import { RootState, AppDispatch } from "../store/store";
import styles from "./ProductList.module.css";
import ProductItem from "../components/ProductItem";
import debounce from "lodash/debounce"


const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {items: products, loading, error , searchQuery, sortOption, category} = useSelector((state: RootState) => state.products)

    useEffect(() => {
        dispatch(fetchProducts());
      }, [dispatch]);

      const debouncedSetSearchQuery = useCallback(
        (query: string) => {
          const delayedQuery = debounce(() => {
            dispatch(setSearchQuery(query));
          }, 300);
          delayedQuery();
        },
        [dispatch]
      );

      const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSetSearchQuery(e.target.value);
      }

      const filteredProducts = useMemo(() => {
        return products
          .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .filter((product) => (category ? product.category === category : true))
          .sort((a, b) => {
            if (sortOption === "price-low") return a.price - b.price;
            if (sortOption === "price-high") return b.price - a.price;
            if (sortOption === "rating") return b.rating.rate - a.rating.rate;
            return 0;
          });
      }, [products, searchQuery, category, sortOption]);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error}</p>;

      return (
        <div className={styles.productList}>
          <h1>Products</h1>
          <div className={styles.filter}>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
          <select onChange={(e) => dispatch(setSortOption(e.target.value))}>
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
          <select onChange={(e) => dispatch(setCategory(e.target.value))}>
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          </div>
          <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
    <ProductItem key={product.id} product={product} />
  ))}
          </div>
        </div>
      );
    };



export default ProductList