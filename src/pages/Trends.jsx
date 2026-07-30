import React from 'react'
import Card from "../components/Card/Card";
import { TrendingUp } from 'lucide-react';
import { MoveRight } from 'lucide-react';
import teslaImg from "../assets/tesla.avif";
import houseImg from "../assets/house.avif";
import iphoneImg from "../assets/iphone15.avif";
import rangeRoverImg from "../assets/range-rover.avif";

const Trends = () => {
    const listings = [
    {
        id: 1,
        image: teslaImg,
        tag: "Motors",
        postedTime: "Today",
        title: "2023 Tesla Model Y Performance - GCC Specs",
        year: "2023",
        location: "Dubai Marina",
        price: "210,000"
    },
    {
        id: 2,
        image: houseImg,
        tag: "Real Estate",
        postedTime: "Today",
        title: "Luxury 2BR Apartment with Marina View",
        year: "2024",
        location: "Dubai Marina",
        price: "1,850,000"
    },
    {
        id: 3,
        image: iphoneImg,
        tag: "Electronics",
        postedTime: "1 hour ago",
        title: "iPhone 15 Pro Max 256GB - Brand New Sealed",
        year: "2024",
        location: "Business Bay",
        price: "4,200"
    },
    {
        id: 4,
        image: rangeRoverImg,
        tag: "Motors",
        postedTime: "Yesterday",
        title: "2022 Range Rover Sport HSE - Full Option",
        year: "2022",
        location: "Downtown Dubai",
        price: "285,000"
    }
]
  return (
    <div>
        <div className="trend-page">
            <div className="trend-text">
                <div className="text-left">
                    <div className="icon-wrap">
                        <TrendingUp size={30}/>
                    </div>
                    <h1>Trending Today</h1>
                </div>
                <div className="text-right">
                    <a href=''>View All<MoveRight size={15}/></a>
                </div>
            </div>
    <div className="trend-cards">
        {listings.map((elem, idx) => (
            <Card
                key={idx}
                tag={elem.tag}
                postedTime={elem.postedTime}
                title={elem.title}
                year={elem.year}
                location={elem.location}
                price={elem.price}
                image={elem.image}
            />
        ))}
    </div>
        </div>
    </div>
  )
}

export default Trends
