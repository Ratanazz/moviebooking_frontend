import React, { useEffect, useState } from "react"; 
import Slider from "react-slick"; 
import API from "../services/API"; 
import styles from "./Home.module.css"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import image1 from "../image/image1.jpg"; 
import image2 from "../image/image2.jpg"; 
import image3 from "../image/image3.jpg"; 
import imdbLogo from "../image/imdb-logo.png"; 
import { Link } from "react-router-dom";   

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
    return <div className={styles.loading}>Loading movies...</div>;   
  }    

  return (     
    <div className={styles['home-container']}>       
      <Slider {...sliderSettings} className={styles['image-slider']}>         
        {sliderImages.map((image) => (           
          <div key={image.id} className={styles.slide}>             
            <img 
              src={image.src} 
              alt={image.title} 
              className={styles['slide-image']} 
            />           
          </div>         
        ))}       
      </Slider>        

      <div className={styles['movies-grid-container']}>         
        <h1 className={styles.title}>Now Showing</h1>         
        <div className={styles['movies-grid']}>           
          {movies.map((movie) => (             
            <Link to={`/movie/${movie.id}`} key={movie.id}>                 
              <div className={styles['movie-card']}>               
                <img                 
                  src={movie.poster_image}                 
                  alt={movie.title}                 
                  className={styles['movie-poster']}               
                />               
                <div className={styles['movie-info']}>                 
                  <p className={styles['movie-date']}>{movie.release_date}</p>                 
                  {movie.rating && (                   
                    <div className={styles['movie-rating-container']}>                     
                      <img 
                        src={imdbLogo} 
                        alt="IMDb" 
                        className={styles['imdb-logo']} 
                      />                     
                      <p className={styles['movie-rating']}>{movie.rating}</p>                   
                    </div>                 
                  )}                 
                  <h4 className={styles['movie-title']}>{movie.title}</h4>                 
                </div>             
              </div>             
            </Link>                        
          ))}         
        </div>       
      </div>     
    </div>   
  ); 
}