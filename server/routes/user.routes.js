import express from 'express';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
const router = express.Router();

// POST Login User /api/users/login

router.post('/login',async (req,res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email})
  
  if(!user || !bcrypt.compareSync(password, user.password)){
    return res.status(404).json({message: 'Invalid email or password'});
  }
  
  res.status(200).json({ message: 'Login successful', 
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role 
    }
  });
})

// POST Register User  /api/users/register

router.post('/register', async(req,res) => {
  const { name, email, password, role } = req.body;
  
  const user = await User.findOne({email});
  
  if(user){
    return res.status(400).json({message: 'User already exists'});
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role
  });
  
  await newUser.save();
  
  res.status(201).json({ message: 'User registered successfully', user: newUser });
})

export default router;