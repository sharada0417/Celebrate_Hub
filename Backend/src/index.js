import express from 'express';
import cors from 'cors';
import ConnectedDB from './infrastructure/db.js';
import dotenv from "dotenv";
import usersRouter from './api/user.js';
import placesRouter from './api/places.js';
import bookingRouter from './api/booking.js';
dotenv.config();

const celebratePlaces = [
  {
    _id: "1",
    name: "Sunset Soirée Beach",
    location: "Maldives",
    suitableFor: ["Engagement", "Wedding", "Surprise Party"],
    image:
      "https://www.paperlesspost.com/blog/wp-content/uploads/00_16BeachBirthdyIdeas_Hero.png",
    description:
      "A serene white-sand beach venue that glows at sunset, perfect for romantic proposals, intimate weddings, or surprise celebrations. Natural ambiance and ocean backdrop set the mood.",
    rating: 4.9,
    reviews: 120,
    price: 1500,
    services: [
      "Food Service",
      "Guest Rooms",
      "Bar Service",
      "Photography",
      "Live Music",
    ],
  },
  {
    _id: "2",
    name: "Boho Beach Bash",
    location: "California Coast",
    suitableFor: ["Birthday Party", "Bridal Shower", "Bachelorette Party"],
    image:
      "https://www.rockymountainbride.com/wp-content/uploads/2021/09/6O6A2533-249-scaled.jpg",
    description:
      "A laid-back beach setup with boho décor—macramé, cushions, low tables—ideal for lively birthdays, whimsical bridal showers, or chic bachelorette events.",
    rating: 4.7,
    reviews: 85,
    price: 1200,
    services: [
      "Food Service",
      "Bar Service",
      "Beach Games",
      "Photography",
      "Event Decor",
    ],
  },
  {
    _id: "3",
    name: "Cliffside Evergreen Grove",
    location: "Pacific Northwest",
    suitableFor: ["Wedding", "Engagement", "Wellness Celebration"],
    image:
      "https://d3emaq2p21aram.cloudfront.net/media/cache/venue_roundup_single_image_flex/uploads/%200Regular_Roundup/Washington-Venues/NatureBridgeOlympic-PhilChester-02.jpg",
    description:
      "A lush, forested cliff overlooking the ocean—great for tranquil wellness-themed weddings, engagement ceremonies, or healing and nature-focused gatherings.",
    rating: 4.8,
    reviews: 64,
    price: 1800,
    services: [
      "Food Service",
      "Guest Rooms",
      "Yoga Sessions",
      "Photography",
      "Floral Arrangements",
    ],
  },
  {
    _id: "4",
    name: "Mountain Meadow Escape",
    location: "Alps, Europe",
    suitableFor: ["Surprise Party", "Birthday Party", "Group Retreat"],
    image:
      "https://platinum-partybus.com/wp-content/uploads/2022/06/Summer-Birthday-Party-Ideas.jpeg",
    description:
      "A grassy mountain meadow with panoramic views—fantastic for surprise long-weekend retreats, milestone birthday bashes, or outdoor adventure-themed parties.",
    rating: 4.6,
    reviews: 53,
    price: 950,
    services: [
      "Food Service",
      "Guest Rooms",
      "Guided Hiking Tours",
      "Campfire Nights",
      "Live Music",
    ],
  },
  {
    _id: "5",
    name: "Venetian Rooftop Romance",
    location: "Venice, Italy",
    suitableFor: ["Proposal", "Anniversary", "Private Dinner"],
    image:
      "https://images.stockcake.com/public/c/b/f/cbfe2c00-8112-4693-81d2-4241be146051_large/romantic-rooftop-dance-stockcake.jpg",
    description:
      "A private rooftop with breathtaking views of Venice's canals—ideal for proposals, anniversaries, and intimate gourmet dinners under the stars.",
    rating: 4.9,
    reviews: 77,
    price: 2000,
    services: [
      "Food Service",
      "Private Chef",
      "Wine Tasting",
      "Live Music",
      "Photography",
    ],
  },
  {
    _id: "6",
    name: "Safari Sunset Camp",
    location: "Serengeti, Tanzania",
    suitableFor: ["Corporate Retreat", "Adventure Party", "Engagement"],
    image:
      "https://atriptourism.com/wp-content/uploads/2023/07/BELLYDANCE-DESERT-SAFARI-DUBAI-0AFAFR0-636x426.jpg",
    description:
      "Luxury tents in the heart of the Serengeti with sundowner views, perfect for adventurous celebrations, retreats, or romantic getaways.",
    rating: 4.8,
    reviews: 88,
    price: 2500,
    services: [
      "Food Service",
      "Luxury Tents",
      "Safari Tours",
      "Bonfire Nights",
      "Bar Service",
    ],
  },
  {
    _id: "7",
    name: "Japanese Zen Garden Pavilion",
    location: "Kyoto, Japan",
    suitableFor: ["Wellness Celebration", "Tea Ceremony", "Cultural Event"],
    image: "https://metropolisjapan.com/wp-content/uploads/2020/03/hanami1.jpg",
    description:
      "A traditional wooden pavilion surrounded by a peaceful Japanese garden, ideal for meditation gatherings, tea ceremonies, and cultural celebrations.",
    rating: 4.7,
    reviews: 49,
    price: 1100,
    services: [
      "Tea Ceremony",
      "Guided Garden Tour",
      "Food Service",
      "Cultural Performances",
      "Photography",
    ],
  },
  {
    _id: "8",
    name: "Desert Starlight Camp",
    location: "Dubai, UAE",
    suitableFor: ["Bachelorette Party", "Birthday Party", "Corporate Event"],
    image:
      "https://c.myholidays.com/blog/blog/content/images/2021/03/Bachelor-Party-In-The-World-1.webp",
    description:
      "A luxury desert camp with lantern-lit seating, camel rides, and starlit skies—ideal for unforgettable celebrations.",
    rating: 4.8,
    reviews: 102,
    price: 2200,
    services: [
      "Food Service",
      "Camel Rides",
      "Bar Service",
      "Fire Dance Shows",
      "Photography",
    ],
  },
];



const app = express();
app.use(express.json());
app.use(cors());
ConnectedDB();

app.use("/api/users",usersRouter);
app.use("/api/places",placesRouter);
app.use("/api/booking",bookingRouter);

const PORT = 5000;
app.listen(5000,
    console.log(`Server is running on port ${PORT}..`)
);

