import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.css";


interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = React.memo(({ product }) => {
  return (
    <div className={styles.productItem}>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className={styles.productImage} loading="lazy" />
        <h2>{product.title}</h2>
        <p>${product.price}</p>
      </Link>
    </div>
  );
});

export default ProductItem;
