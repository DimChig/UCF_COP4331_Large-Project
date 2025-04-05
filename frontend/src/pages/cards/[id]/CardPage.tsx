import { useParams } from "react-router-dom";

const CardPage = () => {
  const { cardId } = useParams();
  return <div>CardPage {cardId}</div>;
};

export default CardPage;
