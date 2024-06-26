import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {UserInfo} from '../models/usermodel.js';

//

export const signup =async (req, res) => {
  try {

    const { username, email, password } = req.body;
    // Check if user already exists
    const user = await UserInfo.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newUser = new UserInfo({
      username, email, password
    });
    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' , newUser});
  }
  catch (error) {
    console.log(error)
  }
};


// Login api use jwt token for authentication //

export const login = async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await UserInfo.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid Password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token , user});

  }
  catch(error){
    console.log(error)
  }
}



let invoked = [];

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Corrected 'req.header' to 'req.headers'
    console.log(token)
    if (!token) return res.status(401).json({ message: 'Auth Error' });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.status(401).json({ message: 'Token verification failed' });

    if (invoked.includes(verified.id)) { // Corrected to check verified.id instead of verified object itself
      return res.status(401).json({ message: 'User already logged out' });
    }

    invoked.push(verified.id); // Store only the user ID instead of the entire verified object
    res.status(200).json({ message: 'Logout successfully' });

  } catch (error) {
    console.error(error); // Add error logging
    return res.status(500).json({ message: 'Internal Server Error' }); // Respond with an error status
  }
}
