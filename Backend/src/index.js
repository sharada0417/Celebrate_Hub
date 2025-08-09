// const express = require("express");
import express from 'express';
// console.log(express);

const app = express();
app.use(express.json());

const celebratePlaces = [
  {
    _id: "1",
    name: "Sunset Soirée Beach",
    location: "Maldives",
    suitableFor: ["Engagement", "Wedding", "Surprise Party"],
    image: "https://yourhost.com/images/sunset-soiree-beach.jpg",
    description:
      "A serene white-sand beach venue that glows at sunset, perfect for romantic proposals, intimate weddings, or surprise celebrations. Natural ambiance and ocean backdrop set the mood.",
  },
  {
    _id: "2",
    name: "Boho Beach Bash",
    location: "California Coast",
    suitableFor: ["Birthday Party", "Bridal Shower", "Bachelorette Party"],
    image: "https://yourhost.com/images/boho-beach-bash.jpg",
    description:
      "A laid-back beach setup with boho décor—macramé, cushions, low tables—ideal for lively birthdays, whimsical bridal showers, or chic bachelorette events.",
  },
  {
    _id: "3",
    name: "Cliffside Evergreen Grove",
    location: "Pacific Northwest",
    suitableFor: ["Wedding", "Engagement", "Wellness Celebration"],
    image: "https://yourhost.com/images/cliffside-evergreen-grove.jpg",
    description:
      "A lush, forested cliff overlooking the ocean—great for tranquil wellness-themed weddings, engagement ceremonies, or healing and nature-focused gatherings.",
  },
  {
    _id: "4",
    name: "Mountain Meadow Escape",
    location: "Alps, Europe",
    suitableFor: ["Surprise Party", "Birthday Party", "Group Retreat"],
    image: "https://yourhost.com/images/mountain-meadow-escape.jpg",
    description:
      "A grassy mountain meadow with panoramic views—fantastic for surprise long-weekend retreats, milestone birthday bashes, or outdoor adventure-themed parties.",
  },
];

// app.get("/",(req,res)=>{
//     console.log(req.ip);
//     res.send("hello");
// })

// app.get("/",(req,res)=>{
//     res.json(celebratePlaces);
// })

// app.get("/1", (req, res) => {
//   const celeplace = celebratePlaces.filter((celeplace) => celeplace._id === "1");
//   res.json(celeplace);
// });


app.get("/:id", (req, res) => {
  const celeplace = celebratePlaces.filter((celeplace) => celeplace._id === "1");
  res.json(celeplace);
});

 //dynamic route
// app.get("/:placeId",(req,res)=>{
//     const placeId = req.params.placeId;
//     res.send("Hotel id is : "+placeId);
// })

//with status code
// app.get("/:placeId",(req,res)=>{
//     const placeId = req.params.hotelId;
//     res.status(201).json("Place id is : "+placeId);
// })

//post
app.post("/",(req,res)=>{
    const celeplace = req.body;
    console.log(celeplace);
    res.status(201).json(celeplace);
})

//delete
app.delete("/:placeId",(req,res)=>{
    const placeId = req.params.Id;

    celebratePlaces.splice(celebratePlaces.findIndex((index)=> celebratePlaces._id === placeId),1);
    res.status(200).json({
        message:"Hotel delete sucessfully",
    })
})


//put
app.put("/:placeId",(req,res)=>{
    const placeId = req.params.Id;
    const updatedHotel = req.body;

    celebratePlaces.filter((place)=>{
        if(place._id === placeId){
            place.name= updatedHotel.name;
            place.location = updatedHotel.location;
            place.suitableFor=updatedHotel.suitableFor;
            place.image=updatedHotel.image;
            place.description=updatedHotel.description;
        } 
    }),
    res.status(200).json({
        message:"place update sucessfully"
    })
})
app.listen(800,
    console.log("Server is running on port")
);

// console.log("Hello world");