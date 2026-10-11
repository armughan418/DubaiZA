import "./RenderFurnitureCards.css";
import { TrendingUp } from "lucide-react";
import { MoveRight } from "lucide-react";
import FurnitureCard from "../FurnitureCard/Furniturecard";

const RenderFurnitureCards = ({ onOpenListing }) => {
  const furnitureGardenListings = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1698936061086-2bf99c7b9fc5?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TW9kZXJuJTIwTC1TaGFwZWQlMjBTb2ZhfGVufDB8fDB8fHww",
      tag: "Furniture",
      postedTime: "Today",
      title: "Modern L-Shaped Sofa - Excellent Condition",
      year: "2023",
      location: "Jumeirah Village Circle",
      price: "1,800",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1758977403341-0104135995af?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ni1TZWF0ZXIlMjBXb29kZW4lMjBEaW5pbmclMjBUYWJsZSUyMFNldHxlbnwwfHwwfHx8MA%3D%3D",
      tag: "Furniture",
      postedTime: "1 week ago",
      title: "6-Seater Wooden Dining Table Set",
      year: "2022",
      location: "Al Nahda",
      price: "2,200",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1750683084791-69bc6eab4083?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fE91dGRvb3IlMjBHYXJkZW4lMjBTd2luZ3xlbnwwfHwwfHx8MA%3D%3D",
      tag: "Garden",
      postedTime: "Yesterday",
      title: "Outdoor Garden Swing Chair with Canopy",
      year: "2023",
      location: "Arabian Ranches",
      price: "950",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1672137233327-37b0c1049e77?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8My1Eb29yJTIwU2xpZGluZyUyMFdhcmRyb2JlJTIwd2l0aCUyME1pcnJvcnxlbnwwfHwwfHx8MA%3D%3D",
      tag: "Furniture",
      postedTime: "3 days ago",
      title: "3-Door Sliding Wardrobe with Mirror",
      year: "2021",
      location: "Al Barsha",
      price: "1,400",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1650270884321-2334d00f0803?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fDQtUGllY2UlMjBSYXR0YW4lMjBQYXRpbyUyMEZ1cm5pdHVyZSUyMFNldHxlbnwwfHwwfHx8MA%3D%3D",
      tag: "Garden",
      postedTime: "Today",
      title: "4-Piece Rattan Patio Furniture Set",
      year: "2024",
      location: "Dubai Hills",
      price: "3,200",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8S2luZyUyMFNpemUlMjBCZWQlMjBGcmFtZSUyMHdpdGglMjBVcGhvbHN0ZXJlZCUyMEhlYWRib2FyZHxlbnwwfHwwfHx8MA%3D%3D",
      tag: "Furniture",
      postedTime: "2 days ago",
      title: "King Size Bed Frame with Upholstered Headboard",
      year: "2023",
      location: "Business Bay",
      price: "1,650",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1590820292118-e256c3ac2676?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RWxlY3RyaWMlMjBMYXduJTIwTW93ZXJ8ZW58MHx8MHx8fDA%3D",
      tag: "Garden",
      postedTime: "5 hours ago",
      title: "Electric Lawn Mower - Barely Used",
      year: "2023",
      location: "Mirdif",
      price: "480",
    },
  ];
  return (
    <div>
      <div className="furniture-card-page">
        <div className="furniture-text">
          <div className="text-left">
            <div className="icon-wrap">
              <TrendingUp size={30} />
            </div>
            <h1>Top Picks</h1>
          </div>
          <div className="text-right">
            <a href="">
              View All
              <MoveRight size={15} />
            </a>
          </div>
        </div>
        <div className="furniture-cards">
          {furnitureGardenListings.map((elem, idx) => (
            <FurnitureCard
              key={idx}
              tag={elem.tag}
              postedTime={elem.postedTime}
              title={elem.title}
              year={elem.year}
              location={elem.location}
              price={elem.price}
              image={elem.image}
              listingId={`furniture-${elem.id}`}
              onOpenListing={onOpenListing}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenderFurnitureCards;
