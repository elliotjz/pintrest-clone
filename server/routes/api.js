const UserModel = require("../models/user");
const User = require("mongoose").model("User");
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

module.exports = function(app) {
  app.post("/api/create-user", (req, res) => {
    const userData = {
      id: req.body.id,
      name: (name = req.body.name),
      pins: [],
      img: req.body.img
    };

    UserModel.findOne({ id: userData.id }, (err, data) => {
      if (err) throw err;

      if (data) {
        if (data.name !== userData.name) {
          // CHANGE NAME ON DB
        }
      } else {
        // No user with this ID, so create user.
        const newUser = new User(userData);
        newUser.save(err => {
          if (err) throw err;
        });
      }
      res.json({
        success: true
      });
    });
  });

  app.get("/api/all-pins", (req, res) => {
    UserModel.find({}, (err, users) => {
      if (err) throw err;
      if (!users) {
        return res.status(200).json({
          pins: []
        });
      }

      const pins = getPinsFromUserList(users);

      return res.status(200).json({
        success: true,
        pins
      });
    });
  });

  app.get("/api/my-pins", (req, res) => {
    UserModel.findOne({ id: req.headers.id }, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.status(200).json({
          success: false,
          errorMessage: "Couldn't find user in database"
        });
      }

      let pins = [];
      if (user.pins && user.pins.length > 0) {
        user.pins.forEach(pin => {
          pins.push(pin);
        });
      }

      pins.sort((a, b) => {
        return b.timeStamp - a.timeStamp;
      });

      return res.status(200).json({
        success: true,
        pins
      });
    });
  });

  app.post("/api/new-pin", (req, res) => {
    UserModel.findOne({ id: req.body.id }, (err, user) => {
      if (err) throw err;
      if (!user) {
        res.status(200).json({
          success: false,
          errorMessage: "Couldn't find user in database"
        });
      }

      let pin = {
        url: req.body.url,
        description: req.body.description,
        likes: [],
        timeStamp: Date.now(),
        userImg: user.img,
        userId: user.id
      };
      user.pins.push(pin);
      user.save({ usePushEach: true }, err => {
        if (err) {
          console.error(err);
          res.status(200).json({
            success: false,
            errorMessage: "Couldn't save pin"
          });
        } else {
          res.status(200).json({
            success: true
          });
        }
      });
    }); // End UserModel.findOne
  }); // End /api/newpin

  app.post("/api/delete-pin", jsonParser, (req, res) => {
    const { id, timeStamp } = req.body;

    UserModel.find({}, (err, users) => {
      if (err) throw err;
      if (!users) {
        res.status(200).json({
          success: false,
          errorMessage: "Couldn't find user in database"
        });
      }

      let updatedPins = null;

      const updatedUsers = users.map(user => {
        if (user.id === id) {
          updatedPins = user.pins.filter(
            pin => pin.timeStamp !== parseInt(timeStamp, 10)
          );
          return { ...user, pins: updatedPins };
        } else {
          return user;
        }
      });

      if (!updatedPins) {
        res.json({
          success: false,
          errorMessage: "Couldn't find pin"
        });
        return;
      }

      UserModel.update({ id }, { $set: { pins: updatedPins } }, err => {
        if (err) throw err;
        return res.status(200).json({
          success: true,
          pins: getPinsFromUserList(updatedUsers)
        });
      });
    }); // End UserModel.findOne
  }); // End deletepin

  app.post("/api/add-like", jsonParser, (req, res) => {
    const { id, timeStamp } = req.body;

    UserModel.find({}, (err, users) => {
      if (err) throw err;
      if (!users) {
        res.status(200).json({
          success: false,
          errorMessage: "Couldn't access the database"
        });
      }

      let ownerOfPin;

      const updatedUsers = users.map(user => {
        let userOwnsPin = false;
        user.pins.map((pin, index) => {
          if (pin.timeStamp === parseInt(timeStamp, 10)) {
            // Found Pin
            userOwnsPin = true;

            // Add or remove the like
            const indexOfLike = pin.likes.indexOf(id);
            if (indexOfLike === -1) {
              // Add the like
              pin.likes.push(id);
            } else {
              // Remove the like
              pin.likes.splice(indexOfLike, 1);
            }
          }
          return pin;
        });

        if (userOwnsPin) ownerOfPin = user;

        return user;
      });

      if (ownerOfPin) {
        UserModel.update(
          { id: ownerOfPin.id },
          {
            $set: {
              pins: ownerOfPin.pins
            }
          },
          err => {
            if (err) throw err;
            return res.status(200).json({
              success: true,
              pins: getPinsFromUserList(updatedUsers)
            });
          }
        );
      } else {
        res.status(200).json({
          success: false,
          errorMessage: "Pin not found"
        });
      }
    }); // End UserModel.findOne
  }); // End addLike
};
