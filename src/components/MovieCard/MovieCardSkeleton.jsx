import React from "react";
import Skeleton from "react-loading-skeleton";
import "./MovieCardSkeleton.scss";
import { SwiperSlide, Swiper } from "swiper/react";
const MovieCardSkeleton = () => {
   return <Skeleton className="card-skeleton" width={250} height={400} />;
};

export default MovieCardSkeleton;
