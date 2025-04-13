import { MovieData } from "@/hooks/useMovies";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  movie: MovieData;
}

function formatRuntime(runtimeInMinutes: number) {
  // Calculate hours and minutes from the given total minutes.
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;

  // Build the formatted string based on available hours/minutes.
  const hoursPart = hours ? `${hours}h` : "";
  const minutesPart = minutes ? `${minutes}m` : "";

  // Combine with a space only if both parts are present.
  if (hours && minutes) {
    return `${hoursPart} ${minutesPart}`;
  }
  // Either only hours or only minutes.
  return hoursPart || minutesPart;
}

const BannerHeaderDescription = ({ movie }: Props) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <h1 className="text-white text-4xl font-extrabold">{movie.title}</h1>
        <div className="text-white opacity-50 text-3xl">{`(${
          movie.release_date ? String(movie.release_date).split("-")[0] : "2000"
        })`}</div>
      </div>
      <div className="flex gap-2 text-white opacity-85">
        <div>{movie.release_date}</div>
        {movie.genres && (
          <>
            <div>•</div>
            <div className="flex">
              {movie.genres.map((genre, index) => {
                return (
                  <React.Fragment key={genre.id}>
                    <Link
                      to={`/movies?sortBy=popularity.desc&genres=${genre.id}`}
                      className="hover:underline"
                    >
                      {genre.name}
                    </Link>
                    {index < movie.genres!.length - 1 && (
                      <div className="mr-1">,</div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </>
        )}
        {movie.runtime && (
          <>
            <div>•</div>
            <div>{formatRuntime(movie.runtime)}</div>
          </>
        )}
      </div>
    </>
  );
};

export default BannerHeaderDescription;
