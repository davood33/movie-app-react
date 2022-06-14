import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./MovieList.scss";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { EffectCoverflow } from "swiper";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import tmdbApi, { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import MovieCard from "../MovieCard/MovieCard";
import "react-loading-skeleton/dist/skeleton.css";
import MovieCardSkeleton from "../MovieCard/MovieCardSkeleton";
const MovieList = (props) => {
   SwiperCore.use([EffectCoverflow]);
   const [items, setItems] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      const getList = async () => {
         let response = null;
         const params = {};

         if (props.type !== "similar") {
            switch (props.category) {
               case category.movie:
                  response = await tmdbApi.getMovieList(props.type, { params });
                  console.log(response.results);
                  setIsLoading(false);
                  break;

               default:
                  response = await tmdbApi.getTvList(props.type, { params });
                  setIsLoading(false);
            }
         } else {
            response = await tmdbApi.similar(props.category, props.id);
            setIsLoading(false);
            console.log(isLoading);
         }
         setItems(response.results);
      };
      getList();
   }, []);
   const array = Array(10).fill(0);
   const space = isLoading ? 40 : 20;
   return (
      <div className="movie-list">
         <Swiper
            grabCursor={true}
            spaceBetween={space}
            slidesPerView={"auto"}
            modules={EffectCoverflow}
            // effect={'coverflow'}
            // coverflowEffect={{
            //    rotate: 0,
            //    stretch: 0,
            //    depth: 50,
            //    modifier: 1,
            //    slideShadows: false,
            //  }}     
         >
            {isLoading
               ? array.map((item, i) => {
                    return (
                       <SwiperSlide key={i}>
                          <MovieCardSkeleton />
                       </SwiperSlide>
                    );
                 })
               : items.map((item, i) => {
                    return (
                       <SwiperSlide key={i}>
                          <MovieCard item={item} category={props.category} />
                       </SwiperSlide>
                    );
                 })}
         </Swiper>
      </div>
   );
};

MovieList.propTypes = {
   category: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
};

export default MovieList;
