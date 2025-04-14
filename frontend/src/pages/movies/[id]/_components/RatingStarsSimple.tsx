import React from "react";
import { FaStar } from "react-icons/fa";

interface Props {
  // A number between 0 and 10. Each 2 points represents a full star.
  rating: number;
}

const RatingStarsSimple: React.FC<Props> = ({ rating }) => {
  const starWidth = 12; // Pixel width for each star
  const stars = [];

  // Render five stars.
  for (let i = 0; i < 5; i++) {
    const starBase = i * 2;
    let fillFraction = (rating - starBase) / 2;
    fillFraction = Math.max(0, Math.min(fillFraction, 1));

    stars.push(
      <div
        key={i}
        style={{
          position: "relative",
          display: "inline-block",
          width: starWidth,
          height: starWidth,
        }}
      >
        {/* Background star: white semi-transparent star */}
        <FaStar
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: starWidth,
            height: starWidth,
          }}
          className="text-black/10"
        />
        {/* Active yellow layer: clipped star for the fill fraction */}
        <div
          style={{
            width: `${fillFraction * 100}%`,
            height: "100%",
            overflow: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <FaStar
            style={{ width: starWidth, height: starWidth }}
            className="text-yellow-400"
          />
        </div>
      </div>
    );
  }

  return <div className="flex flex-row items-center gap-0.5">{stars}</div>;
};

export default RatingStarsSimple;
