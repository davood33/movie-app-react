import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
const VideoList = (props) => {
   const { category } = useParams();

   const [videos, setVideos] = useState([]);

   useEffect(() => {
      const getVideos = async () => {
         const res = await tmdbApi.getVideos(category, props.id);
         console.log(res.results.slice(0, 5));
         setVideos(res.results.slice(0, 6));
      };
      getVideos();
   }, [category, props.id]);

   return (
      <div className="video-wrapper">
         {videos.map((item, i) => {
            return <Video key={i} item={item} />;
         })}
      </div>
   );
};
const Video = (props) => {
   const item = props.item;

   const iframeRef = useRef(null);

   useEffect(() => {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
      iframeRef.current.setAttribute("height", height);
   }, []);

   return (
      <div className="video">
         <div className="video__title">
            <h2>{item.name}</h2>
         </div>
         <iframe
            src={`https://www.youtube.com/embed/${item.key}`}
            ref={iframeRef}
            width="100%"
            title="video"
         ></iframe>
      </div>
   );
};
export default VideoList;
