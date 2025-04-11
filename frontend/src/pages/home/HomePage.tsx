import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="p-4 text-3xl">
      HomePage. Go to <Link to="/movies">/movies</Link>
    </div>
  );
};

export default HomePage;
