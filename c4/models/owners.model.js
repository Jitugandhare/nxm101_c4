const mongoose = require("mongoose")


const ownerSchema = mongoose.Schema({
  owner_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});



const OwnerModel = mongoose.model("owner", ownerSchema);

module.exports = {
    OwnerModel
}