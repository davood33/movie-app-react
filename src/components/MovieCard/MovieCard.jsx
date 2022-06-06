import React from "react";
import PropTypes from "prop-types";
import "./MovieCard.scss";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import apiConfig from "../../api/apiConfig";
import {category} from '../../api/tmdbApi'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const MovieCard = (props) => {
   const item = props.item;
   const link = "/" + category[props.category] + "/" + item.id;
   const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
   return (
      <Link to={`/${props.category}`}>
         <div
            className="movie-card"
            style={{ backgroundImage: `url(${bg})` }}
         >
             <Button>
                 <i className="bx bx-play"></i>
             </Button>
         </div>
         <h3>{item.title || item.name}</h3>
      </Link>
   );
};

export default MovieCard;
