import Electronichero from "../components/Electronic-Hero/Electronichero";
import Electronicscard from "../components/Electronic-Cards/Electronicscard";

const Electronics = ({ onOpenListing }) => {
  return (
    <div>
      <Electronichero />
      <Electronicscard onOpenListing={onOpenListing} />
    </div>
  );
};

export default Electronics;
