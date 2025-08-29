import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// desc => register user

const register = async(req,res) => {
  
  try {
    const { name, email, password, role } = req.body;
    
    if(await User.findOne({email}))
      return res.status(400).json({error: 'User already exists'})
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    })
    
    await newUser.save()
    
    res.status(201).json({message: 'User registered successfully',
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
    })
  } catch (error) {
    res.status(400).json({ error });
  }
}

// desc => login user

const login = async(req,res) => {
  
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({email})
    
    if(!user)
      return res.status(400).json({error: 'User does not exist'})
    
    const isMatch = await bcrypt.compare(password, user.password)
    
    if(!isMatch)
      return res.status(400).json({error: 'Invalid credentials'})
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
    
    res.status(200).json({message: 'User logged in successfully', token})
  } catch (error) {
    res.status(400).json({ error });
  }
}

export default {register, login};