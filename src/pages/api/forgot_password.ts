import { generateToken } from "../../../utils/token"
import sendEmail from "../../../utils/sendEmail"
import type { NextApiRequest, NextApiResponse } from 'next'

const BASE_URL = process.env.NEXTAUTH_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed if not a POST request
    }
  
    try {
      // GET USER INFO, CREATE TOKEN AND SEND EMAIL
        const { user } = await req.body;
        const token = generateToken({user});

        await sendEmail({
            to:user.email,
            url: `${BASE_URL}/account/reset_password?token=${token}`,
            text: 'RESET PASSWORD'
        })
        res.status(201).json({ message: "Email to reset password is send." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }