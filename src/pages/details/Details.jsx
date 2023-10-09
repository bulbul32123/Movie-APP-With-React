import React from 'react';
import './style.scss';
import Similar from './carouselss/Similar';
import useFetch from '../../hooks/UseFetch';
import { useParams } from 'react-router-dom';
import Cast from '../../components/cast/Cast';
import VideosSection from './VideoSection/VideoSection';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Recommendation from './carouselss/Rcommendation';

export default function Details() {
  const {mediaType, id} =  useParams();
  const {data,loading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data:credits, loading:creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <div>
      <DetailsBanner
       video={data?.results?.[0]} 
       crew={credits?.crew}
      />

      <Cast  
      data={credits?.cast} 
      loading={creditsLoading}
      />

      <VideosSection
       data={data} 
      loading={loading}
      />

      <Similar  
      mediaType={mediaType} 
      id={id}        
      />

      <Recommendation 
       mediaType={mediaType} 
       id={id} 
       />

    </div>
  );
};
