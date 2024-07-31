import React, { useEffect, useState } from 'react';
import './Landpage.css';
function land() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = ['원본.png', '결과.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="main-container">
        <div className="container_landing">
          <header className="head">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h1 className="title">시바스 였습니다</h1>
            <p className="description_one">Simple, free Image Segmentation</p>
            <p className="description_two">to Make HTML</p>
            <button className="start-button">Start Segmentation</button>
          </header>
          <div className="exSection">
            <div className="description">
              <ul>
                <li>Segmentation</li>
                <p>image segmentation to create HTML</p>
                <li>Free</li>
                <p>free image segmentation</p>
                <li>Simple</li>
                <p>easy image segmentation</p>
              </ul>
              <p></p>
            </div>
            <div className="image-container">
              <img
                src={images[currentImageIndex]}
                alt="Example"
                className="example-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default land;
