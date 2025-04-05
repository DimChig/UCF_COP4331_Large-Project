import { Link } from "react-router-dom";
import CardContainer from "./CardContainer";

const CardsPage = () => {
  let cards = [];
  for (let i = 0; i < 100; i++) cards.push(i); //random id's

  return (
    <div className="w-full p-4">
      <div>CardsPage</div>
      <div className="mt-8">Cards List Example:</div>
      <div className="grid grid-cols-6 w-full justify-between gap-4 p-4">
        {cards.map((cardId) => (
          <Link to={`/cards/${cardId}`} key={cardId}>
            <CardContainer cardId={cardId} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardsPage;
