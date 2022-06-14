import React, { useEffect, useRef, useState } from "react";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import SwiperCore, {
   Autoplay,
   EffectFade,
   EffectFlip,
   EffectCube,
   Navigation,
   EffectCoverflow
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import Button, { OutlineButton } from "../Button/Button";
import "./HeroSlide.scss";
import Modal, { ModalContent } from "../Modal/Modal";
import HeroSlideSkeleton from "./HeroSlideSkeleton.jsx";
import gsap, { Elastic } from "gsap";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";

const HeroSlide = () => {
   SwiperCore.use([Autoplay, EffectFade, Navigation, EffectFlip,EffectCoverflow]);

   const [movieItems, setMovieItems] = useState([]);
   const [isLoading, setisLoading] = useState(true);
   useEffect(() => {
      const getMovies = async () => {
         const params = { page: 1 };
         try {
            const response = await tmdbApi.getMovieList(movieType.popular, {
               params,
            });
            setisLoading(false);
            setMovieItems(response.results.slice(4, 10));
            console.log(response);
         } catch (error) {
            console.log(error);
         }
      };
      getMovies();
   }, []);

   return (
      <div
         className="hero-slide"
         style={{
            padding: `${isLoading ? "0 2rem" : "0"}`,
            marginTop: `${isLoading ? "15px" : "0"}`,
            marginBottom: `${isLoading ? "1rem" : "3rem"}`,
         }}
      >
         <Swiper
            modules={[Autoplay, EffectFade, EffectFlip,EffectCoverflow]}
            effect={'coverflow'}
            coverflowEffect={{
               rotate: 50,
               stretch: 0,
               depth: 100,
               modifier: 1,
               slideShadows: true,
             }}     
            grabCursor={true}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
         >
            {isLoading ? (
               <HeroSlideSkeleton />
            ) : (
               movieItems.map((item, i) => {
                  return (
                     <SwiperSlide key={i}>
                        {({ isActive }) => {
                           return (
                              <HeroSlideItem
                                 item={item}
                                 className={`${isActive ? "active" : ""}`}
                                 isActive={isActive}
                              />
                           );
                        }}
                     </SwiperSlide>
                  );
               })
            )}
         </Swiper>
         {movieItems.map((item, i) => (
            <TrailerModal key={i} item={item}></TrailerModal>
         ))}
      </div>
   );
};
const HeroSlideItem = (props) => {
   const navigate = useNavigate();
   const item = props.item;
   const posterImg = useRef(null);
   const heroSlide = useRef(null);
   const background = apiConfig.originalImage(
      item.backdrop_path ? item.backdrop_path : item.poster_path
   );
   const setModalActive = async () => {
      const modal = document.querySelector(`#modal_${item.id}`);
      const videos = await tmdbApi.getVideos(category.movie, item.id);
      console.log(videos.results);
      if (videos.results.length > 0) {
         let videoSrc =
            "https://www.youtube.com/embed/" + videos.results[0].key;
         videos.results.forEach((video) => {
            if (video.type === "Trailer" || video.type === "Teaser") {
               videoSrc = "https://www.youtube.com/embed/" + video.key;
            }
         });
         modal
            .querySelector(`.modal__content > iframe`)
            .setAttribute("src", videoSrc);
      } else {
         modal.querySelector(`.modal__content`).innerHTML = "No trailer found";
      }
      modal.classList.toggle("active");
   };
   // useEffect(() => {
   //    if (props.isActive) {
   //       gsap.to(posterImg.current, {
   //          duration: .2,
   //          scale: 1,
   //          rotate: 0,
   //       });
   //    }
   //    console.log(props.isActive)
   // }, [props.isActive]);

   return (
      <div
         className={`hero-slide__item ${props.className}`}
         style={{ background: `url(${background})` }}
         ref={heroSlide}
      >
         <div className="hero-slide__item__content container">
            <div className="hero-slide__item__content__info">
               <h2 className="title">{item.title}</h2>
               <div className="overview">{item.overview}</div>
               <div className="btns">
                  <Button
                     onClick={() => {
                        navigate("/movie/" + item.id);
                     }}
                  >
                     Watch now
                  </Button>
                  <OutlineButton
                     onClick={() => {
                        setModalActive();
                     }}
                  >
                     Watch trailer
                  </OutlineButton>
               </div>
            </div>
            <div className="hero-slide__item__content__poster">
               <img
                  ref={posterImg}
                  src={apiConfig.w500Image(item.poster_path)}
                  alt=""
               />
            </div>
         </div>
      </div>
   );
};
const TrailerModal = (props) => {
   const item = props.item;
   const iframeRef = useRef(null);
   const onCLose = () => iframeRef.current.setAttribute("src", "");

   return (
      <Modal active={false} id={`modal_${item.id}`}>
         <ModalContent onCLose={onCLose}>
            <iframe
               ref={iframeRef}
               width="100%"
               height={"500px"}
               title={"trailer"}
            ></iframe>
         </ModalContent>
      </Modal>
   );
};
export default HeroSlide;
