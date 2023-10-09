  // Imported The Components And Hooks
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from "./pages/home/Home";
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404page/PageNotFound';


function App() {
  // Fetching Datas and Set Datas in store

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    FetchingApiConfig()
    genresCall()
  }, []);

  const FetchingApiConfig = () => {
    fetchDataFromApi('/configuration').then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        porfile: res.images.secure_base_url + 'original'
      }
      dispatch(getApiConfiguration(url))
    })
  };

  const genresCall = async () => {
    let promises = []
    let endPoint = ['tv', 'movie']
    let allGenres = {}
        endPoint.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`))
    });

  const data = await Promise.all(promises)
    data.map(({ genres }) => {
      return genres.map((items) => (allGenres[items.id] = items))
    })
        dispatch(getGenres(allGenres))
  };

  return (
    // Add Routing 
    <BrowserRouter>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  );
};

export default App;
