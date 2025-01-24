import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import play from "../image/play.png";
import store from "../image/store.png";
import image1 from "../image/image1.jpg";
import image2 from "../image/image2.jpg";
import image3 from "../image/image3.jpg";
import "../pages/Home.css";
function Footer() {
  const [loading, setLoading] = useState(true);

  const sliderImages = [
    { id: 1, src: image1, title: "Special Offer 1" },
    { id: 2, src: image2, title: "Special Offer 2" },
    { id: 3, src: image3, title: "Special Offer 3" },
  ];
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <footer className="footer">
        <Slider {...sliderSettings} className="footer-slider">
          {sliderImages.map((image) => (
            <div key={image.id} className="footer-slide">
              <img
                src={image.src}
                alt={image.title}
                className="footer-slide-image"
              />
            </div>
          ))}
        </Slider>
        <div className="footer-content">
          <div className="footer-columns">
            <div>
              <h3>Company</h3>
              <ul>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Cinemas</li>
              </ul>
            </div>
            <div>
              <h3>More</h3>
              <ul>
                <li>Promotions</li>
                <li>News & Activity</li>
                <li>My Ticket</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3>Download Our App</h3>
              <div className="app-icons">
                <img src={play} alt="Google Play" />
                <img src={store} alt="App Store" />
              </div>
            </div>
          </div>
          <div className="social-links">
            <p>Follow Us</p>
            <div>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-tiktok"></i>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer