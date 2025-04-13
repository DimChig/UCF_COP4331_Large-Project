import HomeSearchSection from "./_components/HomeSearchSection";
import MoviesHorizontalSection from "./_components/MoviesHorizontalSection";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      <HomeSearchSection />
      <MoviesHorizontalSection label="Trending" endpoint="trending" />
    </div>
  );
};

export default HomePage;
