import React from 'react'
import './Electroniccard.css'
import { TrendingUp } from 'lucide-react';
import { MoveRight } from 'lucide-react';
import ElectronicCard from '../Electronic-Card/ElectronicCard';

const Electronicscard = (props) => {
        const electronicsListings = [
    {
        id: 1,
        image:"https://images.unsplash.com/photo-1736173155811-e8142fd553ee?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTUlMjBwcm8lMjBtYXh8ZW58MHx8MHx8fDA%3D",
        tag: "Electronics",
        postedTime: "Today",
        title: "iPhone 15 Pro Max 256GB - Brand New Sealed",
        year: "2024",
        location: "Business Bay",
        price: "4,200"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1651241680016-cc9e407e7dc3?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFjYm9vayUyMHBybyUyMG0zfGVufDB8fDB8fHww",
        tag: "Electronics",
        postedTime: "1 hour ago",
        title: "MacBook Pro M3 14-inch 512GB Space Black",
        year: "2024",
        location: "Al Barsha",
        price: "7,500"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q3VzdG9tJTIwR2FtaW5nJTIwUEN8ZW58MHx8MHx8fDA%3D",
        tag: "Electronics",
        postedTime: "Yesterday",
        title: "Custom Gaming PC - RTX 4070, Ryzen 7, 32GB RAM",
        year: "2023",
        location: "Jumeirah Village Circle",
        price: "5,800"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1548378329-437e1ef34263?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U29ueSUyMFdILTEwMDBYTTUlMjBXaXJlbGVzcyUyME5vaXNlJTIwQ2FuY2VsbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
        tag: "Electronics",
        postedTime: "2 days ago",
        title: "Sony WH-1000XM5 Wireless Noise Cancelling",
        year: "2023",
        location: "Deira",
        price: "850"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWVjaGFuaWNhbCUyMEtleWJvYXJkfGVufDB8fDB8fHww",
        tag: "Electronics",
        postedTime: "Today",
        title: "Mechanical Keyboard - Keychron K8 Pro",
        year: "2024",
        location: "Al Nahda",
        price: "320"
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1666771410140-0573b232426e?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGNkJTIwc2NyZWVufGVufDB8fDB8fHww",
        tag: "Electronics",
        postedTime: "3 hours ago",
        title: "Samsung Odyssey G7 27-inch 240Hz Gaming Monitor",
        year: "2023",
        location: "Dubai Silicon Oasis",
        price: "1,450"
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGxheVN0YXRpb24lMjA1JTIwU2xpbSUyMHdpdGglMjAyJTIwQ29udHJvbGxlcnN8ZW58MHx8MHx8fDA%3D",
        tag: "Electronics",
        postedTime: "Yesterday",
        title: "PlayStation 5 Slim with 2 Controllers",
        year: "2024",
        location: "Downtown Dubai",
        price: "1,650"
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RGVsbCUyMFhQUyUyMDE1JTIwLSUyMGk3JTJDJTIwMTZHQiUyMFJBTSUyQyUyMDFUQiUyMFNTRHxlbnwwfHwwfHx8MA%3D%3D",
        tag: "Electronics",
        postedTime: "4 days ago",
        title: "Dell XPS 15 - i7, 16GB RAM, 1TB SSD",
        year: "2022",
        location: "Al Qusais",
        price: "3,200"
    },
    {
        id: 9,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXBwbGUlMjBXYXRjaCUyMFVsdHJhJTIwMiUyMC0lMjBHUFMlMjAlMkIlMjBDZWxsdWxhcnxlbnwwfHwwfHx8MA%3D%3D",
        tag: "Electronics",
        postedTime: "Today",
        title: "Apple Watch Ultra 2 - GPS + Cellular",
        year: "2024",
        location: "Palm Jumeirah",
        price: "2,750"
    },
    {
        id: 10,
        image: "https://images.unsplash.com/photo-1613235577937-9ac3eed992fc?&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2Fub24lMjBFT1MlMjBSNiUyME1hcmslMjBJSSUyMHdpdGglMjAyNC0xMDVtbSUyMExlbnN8ZW58MHx8MHx8fDA%3D",
        tag: "Electronics",
        postedTime: "1 week ago",
        title: "Canon EOS R6 Mark II with 24-105mm Lens",
        year: "2023",
        location: "Mirdif",
        price: "8,900"
    }
];
  return (
    <div>
        <div className="electronics-card-page">
            <div className="trend-text">
                        <div className="text-left">
                            <div className="icon-wrap">
                                <TrendingUp size={30}/>
                            </div>
                            <h1>Top Picks</h1>
                        </div>
                        <div className="text-right">
                            <a href=''>View All<MoveRight size={15}/></a>
                        </div>
                    </div>
                    <div className="electronics-cards">
        {electronicsListings.map((elem, idx) => (
            <ElectronicCard
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

export default Electronicscard
