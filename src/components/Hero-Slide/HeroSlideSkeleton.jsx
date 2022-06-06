import React from "react";
import Skeleton from "react-loading-skeleton";
import "./HeroSlideSkeleton.scss";
const HeroSlideSkeleton = () => {
   const width = document.querySelector(".hero-slide");
   console.log(width) 
   return <Skeleton className="hero-skeleton" height={550} />;
};

export default HeroSlideSkeleton;
