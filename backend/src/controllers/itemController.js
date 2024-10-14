const Item = require('../models/Item');
const upload = require('../utils/cloudinaryConfig');

exports.createItem = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Error uploading image" });
    }

    const { title, description, price, latitude, longitude } = req.body;
    const userId = req.user.id;

    try {
      const item = new Item({
        title,
        description,
        price,
        location: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        user: userId,
        imageUrl: req.file ? req.file.path : null
      });
      await item.save();
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Error creating item" });
    }
  });
};

exports.searchItems = async (req, res) => {
  const { latitude, longitude, distance } = req.query;

  try {
    const items = await Item.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseFloat(distance) * 1000
        }
      }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error searching items" });
  }
};