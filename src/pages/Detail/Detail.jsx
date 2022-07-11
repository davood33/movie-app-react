import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.scss";
import DetailSkeleton from "./DetailSkeleton";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import CastList from "./CastList";
import VideoList from "./VideoList";
const Detail = () => {
   const { category, id } = useParams();
   const [item, setItem] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      const getDetail = async () => {
         let response = null;
         const params = {};
         response = await tmdbApi.detail(category, id, { params });
         window.scrollTo(0, 0);
         setItem(response);
         setIsLoading(false);
      };
      getDetail();
   }, [category, id]);

   return (
      <>
         {isLoading ? (
            <DetailSkeleton />
         ) : (
            <>
               <div
                  className="banner"
                  style={{
                     backgroundImage: `url(${apiConfig.originalImage(
                        item.backdrop_path || item.poster_path
                     )})`,
                  }}
               ></div>
               <div className="mb-3 movie-content container">
                  <div className="movie-content__poster">
                     <div
                        className="movie-content__poster__img"
                        style={{
                           backgroundImage: `url(${apiConfig.originalImage(
                              item.poster_path || item.backdrop_path
                           )})`,
                        }}
                     ></div>
                  </div>
                  <div className="movie-content__info">
                     <div className="title">{item.title || item.name}</div>
                     <div className="genres">
                        {item.genres &&
                           item.genres.slice(0, 5).map((genre, i) => {
                              return (
                                 <span className="genres__item" key={i}>
                                    {genre.name}
                                 </span>
                              );
                           })}
                     </div>
                     <p className="overview">{item.overview}</p>
                     <div className="cast">
                        <div className="section__header">
                           <h2>Casts</h2>
                        </div>
                        <CastList id={item.id} />
                     </div>
                  </div>
               </div>
               <div className="container">
                  <div className="section mb-3">
                     <VideoList id={item.id} />
                  </div>
               </div>
            </>
         )}
      </>
   );
};

export default Detail;
