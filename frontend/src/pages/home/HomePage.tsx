import HomeSearchSection from "./_components/HomeSearchSection";
import MoviesHorizontalSection from "./_components/MoviesHorizontalSection";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      <HomeSearchSection />
      <div className="flex flex-col gap-4 p-8">
        <MoviesHorizontalSection label="What's Popular" endpoint="popular" />
        <MoviesHorizontalSection
          label="Top Rated Movies"
          endpoint="top-rated"
        />
        <MoviesHorizontalSection label="Upcoming Movies" endpoint="upcoming" />
      </div>
    </div>
  );
};

export default HomePage;
