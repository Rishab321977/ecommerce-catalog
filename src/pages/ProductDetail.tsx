import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './ProductDetail.module.css';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetail = () => {
  const { id } = useParams<string>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then(res => {
      setProduct(res.data);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setError("Failed to load product");
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <div className={styles.productDetail}>
        <h1>{product.title}</h1>
        <img src={product.image} alt={product.title} className={styles.productImage} />
        <p>{product.description}</p>
        <p className={styles.productPrice}>Price: ${product.price}</p>
        <p className={styles.productRating}>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
      </div>
    </>
  );
};

export default ProductDetail;