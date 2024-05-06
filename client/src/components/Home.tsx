import React, { useState } from "react";
import "./styles.css";




const Home = () => {

  const images = ["/1.jpg", "/2.jpg", "/3.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };





  return (
    <div>
       <div className="image-container">
      <img src={images[currentIndex]} alt="Slide" className="image" />
      <div className="arrow left" onClick={prevImage}>
        &lt;
      </div>
      <div className="arrow right" onClick={nextImage}>
        &gt;
      </div>
    </div>

      <div className="container">
        <div className="top-box">
        <img src="p1.png" alt="Slide" className="im" />
        </div>
        <div className="top-box">
        <img src="p2.png" alt="Slide" className="im" />
        </div>
        <div className="bottom-box">
        <img src="p3.png" alt="Slide" className="im" />
        </div>
        <div className="bottom-box">
        <img src="p4.png" alt="Slide" className="im" />
        </div>
      </div>
    </div>
  );
};

export default Home;
