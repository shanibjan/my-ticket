import User from "@/models/userModel";
import { comparePassword } from "@/helpers/authHelper";
import Cors from 'cors';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'], // Allowed methods
  origin: 'https://my-ticket-b9fg.vercel.app', // Replace with your deployed frontend URL
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req,res) {
    try {
      await runMiddleware(req, res, cors);
        const{phone,password}=req.body
        console.log(phone);
        
          console.log(req.body);
          
       
        if (!phone || !password) {
          return res.status(400).send({
            success: false,
            message: "All Fields Are Required",
          });
        }
        if(phone.length !==13){
          return res.status(400).send({ message: "Invalid phone number" });
          
        }

        const existingUser=await User.findOne({phone})
        if(!existingUser){
            return res.status(400).send({
                success: false,
                message: "Not Registered with this Number",
              });
        }

        const match= await comparePassword(password,existingUser.password)
        if(!match){
            return res.status(400).send({
                success: false,
                message: "InvaidPassword",
              });
        }

        res.status(200).send({
            success: true,
            message: "Login successful",
           
            user: {
              _id: existingUser._id,
              name: existingUser.name,
              phone: existingUser.phone,
              password: existingUser.password,
            },
          });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
          });
    }
}