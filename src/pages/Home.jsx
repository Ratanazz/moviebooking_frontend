import Slider from "react-slick";
import API from "../services/API";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import imdbLogo from "./imdb-logo.png"; 
import play from "./play.png";
import store from "./store.png";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliderImages = [
    { id: 1, src: image1, title: "Special Offer 1" },
    { id: 2, src: image2, title: "Special Offer 2" },
    { id: 3, src: image3, title: "Special Offer 3" },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await API.get("/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  return (
    <div className="home-container">
      {/* Existing slider and movie section */}
      <Slider {...sliderSettings} className="image-slider">
        {sliderImages.map((image) => (
          <div key={image.id} className="slide">
            <img src={image.src} alt={image.title} className="slide-image" />
          </div>
        ))}
      </Slider>

      <div className="movies-grid-container">
        <h1 className="title">Now Showing</h1>
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.poster_image}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <p className="movie-date">{movie.release_date}</p>
                {movie.rating && (
                  <div className="movie-rating-container">
                    <img src={imdbLogo} alt="IMDb" className="imdb-logo" />
                    <p className="movie-rating">{movie.rating}</p>
                  </div>
                )}
                <h4 className="movie-title">{movie.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
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
                <img src={play}alt="Google Play" />
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