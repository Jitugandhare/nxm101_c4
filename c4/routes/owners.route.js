const express = require("express");
const { OwnerModel } = require("../models/owners.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const ownerRouter = express.Router();


// /**
//    * @swagger
//      * components:
//         * schemas:

//           * type: object
//           * properties:
//               * id:
//                 * type: string
//                 * description: The auto-generated id of the owner
//             * name:
// * type: string
// * description: The user name
// * email:
// * type: string
// * description: The user email
// *phone:
// *type: string
//   description: phone of the owner
// * age:
// *type: integer
//   description: Age of the owner
// */

ownerRouter.post("/signup", async (req, res) => {
  const { owner_name, email, password, phone, age, city } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.json({ error: err.msg });
      } else {
        const owner = new OwnerModel({
          owner_name,
          email,
          password: hash,
          phone,
          age,
          city,
        });

        await owner.save();
      }
    });

    res.json({ msg: "Registers a new owner" });
  } catch (err) {
    res.json({ error: err });
  }
});

ownerRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const owner = await OwnerModel.findOne({ email });
    if (owner) {
      bcrypt.compare(password, owner.password, (err, result) => {
          let token = jwt.sign({ ownerID: owner._id }, "jitu",{expiresIn:"7m"});
          res.status(200).json({ msg: "login successfull",token })
          
      });
    } else {
        res.status(400).json({ msg: "wrong credentials" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

ownerRouter.post("/logout", (req, res) => {});

module.exports = {
  ownerRouter,
};
