import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      userId: decoded.userId,
    });
    

    if (!user) {
      return res.json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    req.user = {
      id: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    req.userId = user.userId;


    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;