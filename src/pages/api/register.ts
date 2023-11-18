import { connectMongoDB } from'../../../lib/mongodb'
import User from '../../../models/user'
import bcrypt from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateToken } from "../../../utils/token"
import sendEmail from "../../../utils/sendEmail"

const BASE_URL = process.env.NEXTAUTH_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      // GET USER INFO, CREATE TOKEN AND SEND EMAIL
      const { name, email, password: rawPassword } = await req.body;
      const password = await bcrypt.hash(rawPassword, 10);
      const token = generateToken({user: { name, email, password }});

     await sendEmail({
         to:email,
         url: `${BASE_URL}/account/verify?token=${token}`,
         text: 'VERIFY EMAIL'
     })

      res.status(201).json({ message: "User registered." });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while registering the user." });
    }
  }
   