const UserModel = require("../models/user");
const PinModel = require("../models/pin");
const User = require("mongoose").model("User");
const Pin = require("mongoose").model("Pin");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

function getPinsFromUserList(users) {
  let pins = [];
  users.forEach(user => {
    if (user.pins.length > 0) {
      user.pins.forEach(pin => {
        pins.push(pin);
      });
    }
  });

  pins.sort((a, b) => {
    return b.timeStamp - a.timeStamp;
  });

  return pins;
}

function sortPins(pins) {
  pins.sort((a, b) => {
    return b.timeStamp - a.timeStamp;
  });
  return pins;
}

module.exports = function(app) {
  app.post("/api/create-user", (req, res) => {
    const userData = {
      id: req.body.id,
      name: (name = req.body.name),
      img: req.body.img
    };

    UserModel.findOne({ id: userData.id }, (err, existingUser) => {
      if (err) {
        console.error(err);
        return res.status(500);
      }

      if (!existingUser) {
        // No user with this ID, so create user.
        const newUser = new User(userData);
        newUser.save(err => {
          if (err) {
            console.error(err);
            return res.status(500);
          }
        });
      }
      res.json({
        success: true
      });
    });
  });

  app.get("/api/all-pins", (req, res) => {
    PinModel.find({}, (err, pins) => {
      if (err) {
        console.error(err);
        return res.status(500);
      }

      const sortedPins = sortPins(pins);

      res.status(200).json({
        success: true,
        pins: sortedPins
      });
    });
  });

  app.post("/api/new-pin", jsonParser, (req, res) => {
    const { id, url, description } = req.body;

    UserModel.findOne({ id }, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          errorMessage: "No user found"
        });
      }

      const pinData = {
        url,
        description,
        likes: [],
        timeStamp: Date.now(),
        userImg: user.img,
        userId: user.id
      };

      const newPin = new Pin(pinData);
      newPin.save(err => {
        if (err) {
          console.error(err);
          res.status(500).json({
            success: false,
            errorMessage: "Error creating pin"
          });
        } else {
          res.status(200).json({
            success: true
          });
        }
      });
    });
  });

  app.post("/api/delete-pin", jsonParser, (req, res) => {
    const { timeStamp } = req.body;

    PinModel.deleteOne({ timeStamp }, err => {
      if (err) {
        console.error(err);
        return res.status(500);
      }

      PinModel.find({}, (err2, pins) => {
        if (err2) {
          console.log(err2);
          return res.status(500);
        }

        const sortedPins = sortPins(pins);

        res.status(200).json({
          success: true,
          pins: sortedPins
        });
      });
    });
  });

  app.post("/api/add-like", jsonParser, (req, res) => {
    const { id, timeStamp } = req.body;

    PinModel.findOne({ timeStamp }, (err, pin) => {
      if (err) {
        console.log(err);
        return res.status(200).json({
          success: false,
          errorMessage: "Unable to add/remove like"
        });
      }

      // Add or remove the like
      const indexOfLike = pin.likes.indexOf(id);
      if (indexOfLike === -1) {
        // Add the like
        pin.likes.push(id);
      } else {
        // Remove the like
        pin.likes.splice(indexOfLike, 1);
      }
      pin.save(err => {
        if (err) {
          console.error(err);
          return res.status(200).json({
            success: false,
            errorMessage: "Unable to add/remove like"
          });
        }
      });
      res.status(200).json({
        success: true,
        pin
      });
    });
  });
};
