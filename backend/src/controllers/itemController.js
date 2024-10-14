// /backend/src/controllers/itemController.js
const Item = require('../models/Item');
const upload = require('../utils/cloudinaryConfig');

// Create a new item
const createItem = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Error uploading image" });
    }

    const { title, description, price, latitude, longitude } = req.body;
    const userId = req.user.id; // Assuming auth middleware sets req.user

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

// Search items by distance
const searchItems = async (req, res) => {
  const { latitude, longitude, distance } = req.query;

  try {
    const items = await Item.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseFloat(distance) * 1000 // Convert km to meters
        }
      }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error searching items" });
  }
};

// Get all items (optional, for testing)
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
};

// Get a single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item" });
  }
};

// Update an item
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    // Check if the user is the owner of the item
    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this item" });
    }

    const { title, description, price, latitude, longitude } = req.body;
    
    item.title = title || item.title;
    item.description = description || item.description;
    item.price = price || item.price;
    if (latitude && longitude) {
      item.location = {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      };
    }

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item" });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the user is the owner of the item
    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }

    await item.remove();
    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
};

module.exports = {
  createItem,
  searchItems,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
};
