const register = async (req, res) => {
    const { username, password } = req.body;
    
    // Validate password length
    if (password.length < 8 || password.length > 12) {
      return res.status(400).json({ message: "Password must be 8-12 characters long" });
    }
    
    try {
      const user = new User({ username, password });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ message: "Username already exists" });
      } else {
        res.status(500).json({ message: "Error registering user" });
      }
    }
  };