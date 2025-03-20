import User from "./models/User.js"
import bcrypt from "bcrypt"
import connectToDatabase from "./database/db.js";

const userRegister = async () => {
  try{
    connectToDatabase();
    const hashedPassword = await bcrypt.hash("adminpassword123",10);
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin"
    })
    await newUser.save();
  }catch(error){
    console.log(error)
  }
}

userRegister();