import User from "../../../models/user";
import {verifyToken} from '../../../utils/token'
import bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // UPDATE PASSWORD
    try {
        const { token, password } = await req.body;
        const  user  = verifyToken(token);
        const userId = user.user._id
        const newPass =  await bcrypt.hash(password, 12);
      await User.findByIdAndUpdate(userId, {password:newPass} )
      res.status(201).json({ message: "User registered." });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while registering the user." });
    }
  }
