import User from "../models/userSchema.js";

export const allUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const startIndex = (page - 1) * limit;

  try {
    const user = await User.find().limit(limit).skip(startIndex);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//user Route
export const userById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//create Route
export const createuser = async (req, res) => {
  const {
    id ,
    first_name,
    last_name,
    email,
    gender,
    avatar,
    domain,
    available,
  } = req.body;

  // Validate required fields
  if (!id  || !first_name || !last_name || !email || !gender || !domain || !available) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create new user instance
const newUser = new User({
    id,
    first_name,
    last_name,
    email,
    gender,
    avatar,
    domain,
    available,
});

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update Route
export const updateUser = async (req, res) => {
  const {
    
    first_name,
    last_name,
    email,
    gender,
    avatar,
    domain,
    available,
  } = req.body;

  try {
 
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        first_name,
        last_name,
        email,
        gender,
        avatar,
        domain,
        available
    }, { new: true });

    if (updatedUser) {
        res.json(updatedUser); 
    } else {
        res.status(404).json({ message: 'User not found' }); 
    }
} catch (error) {
    res.status(500).json({ message: error.message }); 
}
};

//delete Route
export const deleteUser = async (req,res)=>{
    try {
   
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(deletedUser){
            res.json({ message: 'User deleted' });
        }else{
            res.json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}
