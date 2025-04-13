import HomeSearchSection from "./_components/HomeSearchSection";
import MoviesHorizontalSection from "./_components/MoviesHorizontalSection";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      <HomeSearchSection />
      <MoviesHorizontalSection label="What's Popular" endpoint="popular" />
    </div>
  );
};

export default HomePage;
