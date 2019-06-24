const UserModel = require("../models/user");
const User = require("mongoose").model("User");

module.exports = function(app) {
  app.post("/api/createuser", (req, res) => {
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

  app.get("/api/allpins", (req, res) => {
    UserModel.find({}, (err, users) => {
      if (err) throw err;
      if (!users) {
        return res.status(200).json({
          pins: []
        });
      }

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

      return res.status(200).json({
        success: true,
        pins
      });
    });
  });

  app.get("/api/mypins", (req, res) => {
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

  app.post("/api/newpin", (req, res) => {
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

  app.post("/api/deletepin", (req, res) => {
    const id = req.headers.id;
    const timeStamp = req.headers.timestamp;

    UserModel.findOne({ id: id }, (err, user) => {
      if (err) throw err;
      if (!user) {
        res.status(200).json({
          success: false,
          errorMessage: "Couldn't find user in database"
        });
      }

      let indexOfPin = -1;
      user.pins.forEach((pin, index) => {
        if (pin.timeStamp === parseInt(timeStamp)) {
          indexOfPin = index;
        }
      });
      user.pins.splice(indexOfPin, 1);
      user.save(err => {
        if (err) throw err;
      });
      user.pins.sort((a, b) => {
        return b.timeStamp - a.timeStamp;
      });
      res.status(200).json({
        success: true,
        pins: user.pins
      });
    }); // End UserModel.findOne
  }); // End deletepin

  app.post("/api/addlike", (req, res) => {
    const id = req.body.id;
    const timeStamp = req.body.timestamp;

    UserModel.find({}, (err, users) => {
      if (err) throw err;
      if (!users) {
        res.status(200).json({
          success: false,
          errorMessage: "Couldn't access the database"
        });
      }

      let updatedPins = null;
      let indexOfPin = null;
      let userId = null;

      users.forEach(user => {
        user.pins.forEach((pin, index) => {
          if (pin.timeStamp === parseInt(timeStamp, 10)) {
            // Found Pin
            userId = user.id;
            updatedPins = user.pins;
            indexOfPin = index;
          }
        });
      });

      if (!updatedPins) {
        res.status(200).json({
          success: false,
          errorMessage: "Pin not found"
        });
      } else {
        const indexOfLike = updatedPins[indexOfPin].likes.indexOf(id);
        if (indexOfLike === -1) {
          updatedPins[indexOfPin].likes.push(id);
        } else {
          updatedPins[indexOfPin].likes.splice(indexOfLike, 1);
        }

        UserModel.update(
          { id: userId },
          {
            $set: {
              pins: updatedPins
            }
          },
          err => {
            if (err) throw err;
            return res.status(200).json({
              success: true
            });
          }
        );
      }
    }); // End UserModel.findOne
  }); // End deletepin
};
