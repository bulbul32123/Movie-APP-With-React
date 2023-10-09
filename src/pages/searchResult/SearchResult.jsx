import React, { useEffect, useState } from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import noResult from '../../assets/no-results.png';
import Spinner from '../../components/spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/movieCard/MovieCard';

export default function SearchResult() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const {query} = useParams();

  const fetchInitialData = ()=>{
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      setData(res)
      setLoading(false)
      setPageNum((pre)=> pre + 1)
      setLoading(false)
    })
  };

  const fetchNextPageData = ()=>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      setData(res)
      if(data.results){
        setData({...data , results:[...data?.results, ...res?.results] })
      }       
      else{
        setData(res)
      }
      setPageNum((pev)=> pev + 1)
    })
    
  };

  useEffect(()=>{
    setPageNum(1)
    fetchInitialData()
  },[query]);

  return (

    <div className='searchResultsPage'>
    {loading && 
    <Spinner initial={true}/>
    }
    {!loading && (<ContentWrapper>
      {data?.results?.length > 0 ? (
        <>

          <div className="pageTitle">
            {`Search ${data?.total_results > 1 ? "results" : "result"} of "${query}"`}
          </div>
          <InfiniteScroll className="content" dataLength={data?.results.length || []} next={fetchNextPageData}
          hasMore={pageNum <= data?.total_pages}
          loader={<Spinner/>}>
            {data?.results?.map((items,index)=>{
              if(items.median_type === "person") return;
               return(
                <MovieCard key={index} data={items}  fromSearch={true}/>
               )
            })} 
          </InfiniteScroll>
        </>
      ): (
        <span className="resultNotFound">
        Sorry, Results not found! <noResult />
        </span>
      )}

    </ContentWrapper>  
    )};
    </div>
  );
};
