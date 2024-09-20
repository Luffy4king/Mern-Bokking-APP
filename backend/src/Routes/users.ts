 import express,{Request,Response} from 'express';
 import User from '../Models/user';
 import jwt from 'jsonwebtoken';
 import {check, validationResult} from 'express-validator';
import verifyToken from '../MiddleWare/auth';

 const router=express.Router();
 router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

//    if request is .api.users.reggister
 router.post('/register',
  [check("firstName","First Name is Required").isString(),
    check("lastName","Last Name is Required").isString(),
    check("email","Please enter a  email id").isEmail(),
    check("password","Password is Required").isLength({min:6}),
    
  ],
  async(req:Request, res:Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
 
try {
 let user = await User.findOne({
    email:req.body.email,
 });
  if(user){
    return res.status(400).json({error:"User already exists"});
  }
  user=new User(req.body);
  await user.save();

  const token =jwt.sign(
    {
        userId:user.id
    },process.env.JWT_SECRET_KEY as string,{
        expiresIn:'24hrs'
    }
  );
   res.cookie ("auth_token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    maxAge:86400000,
   })
   return res.status(200).send({message:"User Registered "});
}catch(err){
res.status(500).json({
    message:"Something went Wrong"
});
}
 })
// ..................................
 export default router;