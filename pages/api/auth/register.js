import User from "@/models/userModel";
import { hashPassword } from "@/helpers/authHelper";


export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { name, phone, password } = req.body;
      if (!name || !phone || !password) {
        return res.status(400).send({
          success: false,
          message: "All Fields Are Required",
        });
      }
      if(phone.length !==13){
        return res.status(400).send({ message: "Invalid phone number" });
        
      }
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: "Already Registered With This Number",
        });
      }

      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword);
      console.log(password);
      
      
      const user = await new User({
        name,
        phone,

        password: hashedPassword,
      }).save();

      res.status(201).send({
        success: true,
        message: "User registered successfully. ",
       
        user: {
          _id: user._id,
          name: user.name,
          phone: user.phone,
          password:hashedPassword
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Signup",
      error,
    });
  }
}
