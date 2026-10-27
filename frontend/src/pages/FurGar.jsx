import Furniturehero from "../components/Furniturehero/Furniturehero";
import RenderFurnitureCards from "../components/RenderFurnitureCards/RenderFurnitureCards";

const FurGar = ({ onOpenListing }) => {
  return (
    <div>
      <Furniturehero />
      <RenderFurnitureCards onOpenListing={onOpenListing} />
    </div>
  );
};

export default FurGar;
