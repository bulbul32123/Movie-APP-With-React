import React, { useEffect, useState } from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/UseFetch';
import Img from '../../../components/lazyLoadingImage/img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

export default function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setquery] = useState("");
  const navigate = useNavigate();
  const { url }  =  useSelector((state)=>state.home);
  const {data,loading} = useFetch('/movie/upcoming');

  useEffect(()=>{
    const bg = url?.backdrop + data?.results?.[Math.floor(Math.random()* 20)]?.backdrop_path
    setBackground(bg)

  },[data]);

  const searchQueryHandle = (event)=>{
    if(event.key === 'Enter' && query.length > 0){
      navigate(`/search/${query}`)
    }
  };

  return (
    <div className="heroBanner">
        {!loading &&  <div className="backdrop-img">
             <Img src={background} alt="" />
    </div>}

    <div className="opacity-layer"></div>

    <ContentWrapper>
       <div className="heroBannerContent">
        <span className="title">Welcome</span>
        <span className="subTitle">Millons of Movies,Tv shows and people to Discover.  Explore now. </span>

        <div className="searchInput">
          <input 
          type="text" 
          placeholder="Search For a Movie or Tv show..."
          onKeyUp={searchQueryHandle} 
          onChange={(e)=>setquery(e.target.value)}
          />

          <button>Search</button>
        </div>
      </div>

    </ContentWrapper>
    </div>
  );
};
