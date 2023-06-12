const express = require("express");
const { HotelModel } = require("../models/hotels.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {auth}=require("../middleware/auth")
const hotelRouter = express.Router();

//hotelRouter.use(auth);


hotelRouter.post("/add", async (req, res) => {
  try {
    const payload = req.body;
    const hotel = await HotelModel(payload);
    await hotel.save();
    res.status(200).json({ msg: "new hotel is registered" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

hotelRouter.get("/hotels/:id", async (req, res) => {
    const { id } = req.params.id;
    try {
        const hotel = await hotel.findOne({ _id: id }, req.body)
        if (hotel) {
            res.status(200).send(hotel);
        } else {
            res.status(400).json({msg:"not found"});
        }
    } catch (err) {
        res.status(400).json({error:err})
    }

});


// /**
// * @swagger
// * /hotels/update/{id}:
// * patch:
// * summary: It will update the hotel details
// * tags: [hotel]
// * parameters:
// * - in: path
// * name: id
// * schema:
// * type: string
// * required: true
// * description: The hotel id
// * requestBody:
// * required: true
// * content:
// * application/json:
// * schema:
// * $ref: '#/components/schemas/hotel'
// * responses:
// * 200:
// * description: The user Deatils has been updated
// * content:
// * application/json:
// * schema:
// * $ref: '#/components/schemas/User'
// * 404:
// * description: The user was not found
// * 500:
// * description: Some error happened
// */
hotelRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params.id;
    const ownerIDdocs = req.body.ownerID;
    try {
        const hotel = await HotelModel.find({ _id: id })
        const hotelIDdocs = hotel.ownerID
        
        if (hotelIDdocs == ownerIDdocs) {
            await HotelModel.findByIdAndUpdate({ _id: id }, req.body);
            res.status(200).json({msg:"hotel data updated"})
        }
    } catch (err) {
        res.status(400).json({ error: err });
    }

});

hotelRouter.delete("/del/:id", async(req, res) => {
    const { id } = req.params.id;
    const ownerIDdocs = req.body.ownerID;
    try {
        const hotel = await HotelModel.find({ _id: id })
        const hotelIDdocs = hotel.ownerID
        
        if (hotelIDdocs == ownerIDdocs) {
            await HotelModel.findByIdAndDelete({ _id: id }, req.body);
            res.status(200).json({msg:"hotel data deleted"})
        }
    } catch (err) {
        res.status(400).json({ error: err });
    }
});
module.exports = {
  hotelRouter,
};
