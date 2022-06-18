import React, { useCallback, useEffect, useState } from "react";
import "./MovieGrid.scss";
import MovieCard from "../MovieCard/MovieCard";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import { useNavigate, useParams } from "react-router-dom";
import { OutlineButton } from "../Button/Button";
import Input from "../Input/Input";
const MovieGrid = (props) => {
   const [items, setItems] = useState([]);
   const [page, setPage] = useState(1);
   const [totalPage, setTotalPage] = useState(0);
   const { keyword } = useParams();

   useEffect(() => {
      const getList = async () => {
         let response = null;
         if (keyword === undefined) {
            const params = {};
            switch (props.category) {
               case category.movie:
                  response = await tmdbApi.getMovieList(movieType.upcoming, {
                     params,
                  });
                  break;

               default:
                  response = await tmdbApi.getTvList(tvType.on_the_air, {
                     params,
                  });

                  break;
            }
         } else {
            const params = {
               query: keyword,
            };
            response = await tmdbApi.search(props.category, { params });
         }
         setItems(response.results);
         setTotalPage(response.total_pages);
      };
      getList();
   }, [props.category, keyword]);
   const loadMore = async () => {
      let response = null;
      if (keyword === undefined) {
         const params = {
            page: page + 1,
         };
         switch (props.category) {
            case category.movie:
               response = await tmdbApi.getMovieList(movieType.upcoming, {
                  params,
               });
               break;

            default:
               response = await tmdbApi.getTvList(tvType.on_the_air, {
                  params,
               });

               break;
         }
      } else {
         console.log("search");
         const params = {
            page: page + 1,
            query: keyword,
         };
         response = await tmdbApi.search(props.category, { params });
      }
      setItems((items) => [...items, ...response.results]);
      setPage(page + 1);
   };
   return (
      <>
         <div className="section mb-3">
            <MovieSearch category={props.category} keyword={keyword} />
         </div>
         <div className="movie-grid">
            {items.map((item, i) => (
               <MovieCard category={props.category} item={item} key={i} />
            ))}
         </div>
         {page < totalPage ? (
            <div className="movie-grid__loadmore">
               <OutlineButton className="small" onClick={loadMore}>
                  Load more
               </OutlineButton>
            </div>
         ) : null}
      </>
   );
};
const MovieSearch = (props) => {
   let navigate = useNavigate();
   const [keyword, setKeyword] = useState(props.keyword);

   const goToSearch = useCallback(() => {
      if (keyword.trim().length > 0) {
         navigate(`../${props.category}/search/${keyword}`);
      }
   }, [keyword, navigate, props.category]);

   useEffect(() => {
      const enterEvent = (e) => {
         e.preventDefault();
         if (e.keyCode === 13) {
            goToSearch();
         }
      };
      document.addEventListener("keyup", enterEvent);

      return () => {
         document.removeEventListener("keyup", enterEvent);
      };
   }, [goToSearch, keyword]);

   return (
      <div className="movie-search">
         <Input
            type={"text"}
            placeholder="search for movie"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
         />
      </div>
   );
};
export default MovieGrid;
