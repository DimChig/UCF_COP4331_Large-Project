import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useSearchParams } from "react-router-dom";
import GenreBadge from "./GenreBadge";
import { genres } from "./genres";

const GenresSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGenreClick = (genreId: number) => {
    const currentGenres = searchParams.get("genres");
    let newGenres;

    if (!currentGenres) {
      newGenres = String(genreId);
    } else {
      const genreIds = currentGenres.split(",");
      if (!genreIds.includes(String(genreId))) {
        newGenres = [...genreIds, genreId].join(",");
      } else {
        newGenres = genreIds.filter((id) => id !== String(genreId)).join(",");
      }
    }

    const updatedParams = new URLSearchParams(searchParams);
    if (newGenres) updatedParams.set("genres", newGenres);
    else updatedParams.delete("genres");

    setSearchParams(updatedParams);
  };

  const isGenreActive = (genreId: number) => {
    const currentGenres = searchParams.get("genres");
    if (!currentGenres) return false;
    else return currentGenres.split(",").includes(String(genreId));
  };

  return (
    <div className="w-full">
      <Card className="w-full gap-2">
        <CardHeader>
          <CardTitle>Genres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button onClick={() => handleGenreClick(genre.id)}>
                <GenreBadge
                  genre={genre.name}
                  key={genre.id}
                  isActive={isGenreActive(genre.id)}
                />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenresSelect;
