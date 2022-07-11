import React from "react";
import Skeleton from "react-loading-skeleton";
import "./Detail.scss";
const DetailSkeleton = () => {
   return (
      <div className="container-skeleton">
         <Skeleton
            className="skeleton-item"
            height={500}
            width={300}
         ></Skeleton>
         <div>
            <Skeleton className="skeleton-item" count={6} height={30} />
            <div className="castSkeleton">
            <Skeleton className="skeleton-item" height={150} width={100} borderRadius={10} />
            <Skeleton className="skeleton-item" height={150} width={100} borderRadius={10} />
            <Skeleton className="skeleton-item" height={150} width={100} borderRadius={10} />
            <Skeleton className="skeleton-item" height={150} width={100} borderRadius={10} />
            <Skeleton className="skeleton-item" height={150} width={100} borderRadius={10} />
            </div>
         </div>
      </div>
   );
};

export default DetailSkeleton;
