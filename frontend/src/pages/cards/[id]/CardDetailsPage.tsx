import { useParams } from "react-router-dom";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  return <div>CardPage {cardId}</div>;
};

export default CardDetailsPage;
