import React, { useState } from "react";
import "./styles.css";
import { Product } from './product';
import { useGetProducts } from "../hooks/useGetProducts";

const Home = () => {
  const images = [ "/3.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  

  const { products } = useGetProducts();

  const firstThreeProducts = products.slice(0, 3);

  return (
    <div>
       <div className="image-container">
          <img src={images[currentIndex]} alt="Slide" className="image" />
          
        </div>
        <div className="products">
            {firstThreeProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
    </div>
  );
};

export default Home;
