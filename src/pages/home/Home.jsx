// Imports Components and Style 
import './style.scss';
import HeroBanner from './herobanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './TopRated/TopRated';

export default function Home() {
  return (
    <div className="homePage">
    {/* Add Components */}
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated  />
    </div>
  );
};
