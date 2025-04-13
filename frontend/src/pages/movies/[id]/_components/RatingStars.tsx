import { MouseEvent, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

interface Props {
  initialValue: number | null | undefined;
  onRatingChanged: (newRating: number) => void;
}

const RatingStars = ({ onRatingChanged, initialValue }: Props) => {
  // The rating is an integer between 0 and 10 (each unit corresponds to a half-star).
  const [rating, setRating] = useState(initialValue ?? 0);
  // A ref to keep track of the latest rating for printing on mouseup.
  const finalRatingRef = useRef(rating);
  const containerRef = useRef<HTMLDivElement>(null);

  // Map mouse position to new rating (0 to 10) snapped to integer (half-star increments)
  const updateRatingFromEvent = (
    e: MouseEvent<HTMLDivElement> | MouseEvent
  ) => {
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      let offsetX = e.clientX - left;
      // Clamp the offset between 0 and the container width
      offsetX = Math.max(0, Math.min(offsetX, width));
      // Calculate rating in [0,10] based on mouse offset
      let newRating = (offsetX / width) * 10;
      // Snap to integer (each integer here equals a half-star)
      newRating = Math.round(newRating);
      setRating(newRating);
      finalRatingRef.current = newRating;
    }
  };

  // Handles click/drag initiation
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    updateRatingFromEvent(e);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      updateRatingFromEvent(moveEvent);
    };

    const handleMouseUp = () => {
      // Remove event listeners on mouse up
      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mouseup", handleMouseUp);
      // Log the final snapped rating value to console
      onRatingChanged(Number(finalRatingRef.current));
    };

    window.addEventListener("mousemove", handleMouseMove as any);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Render five stars.
  // Each star corresponds to 2 points. For a given star at index i:
  //   fillFraction = clamp((rating - i*2) / 2, 0, 1)
  // For example, a rating of 3 means:
  //   Star 0: (3 - 0)/2 = 1.5 -> 1 (100% fill)
  //   Star 1: (3 - 2)/2 = 0.5 -> 50% fill
  //   Star 2 and beyond: no fill.
  const renderStars = () => {
    const stars = [];
    const starWidth = 20;

    for (let i = 0; i < 5; i++) {
      const starBase = i * 2;
      let fillFraction = (rating - starBase) / 2;
      fillFraction = Math.max(0, Math.min(fillFraction, 1));

      // Each star is drawn as a container with two layers:
      //   - The inactive layer (background) is a full black star.
      //   - The active layer (foreground) is a gold star that is clipped in width
      //     according to the fillFraction.
      stars.push(
        <div
          key={i}
          style={{
            position: "relative",
            display: "inline-block",
            width: starWidth,
            height: starWidth,
            marginRight: "4px",
          }}
        >
          {/* Inactive layer: full star in black */}
          <FaStar
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: starWidth,
              height: starWidth,
            }}
            className="text-white/25 group-hover:text-black transition"
          />
          {/* Active layer: full star in gold, clipped by the fill fraction */}
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
    return stars;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      style={{
        display: "inline-flex",
        alignItems: "center",
        userSelect: "none",
        cursor: "pointer",
        padding: "4px",
      }}
    >
      {renderStars()}
    </div>
  );
};

export default RatingStars;
