interface Props {
  cardId: number;
}

const CardContainer = ({ cardId }: Props) => {
  return (
    <div className="p-2 h-20 border border-amber-500 hover:bg-amber-100 rounded-md cursor-pointer ">
      <div className="flex justify-center items-center h-full">
        Card {cardId}
      </div>
    </div>
  );
};

export default CardContainer;
