import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const atoken = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      atoken,
      process.env.ADMIN_JWT_SECRET
    );

    const admin = await userModel.findOne({
      userId: decoded.userId,
      role: "admin",
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin tidak ditemukan",
      });
    }

    req.admin = {
      id: admin.userId,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    req.adminId = admin.userId;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin token",
    });
  }
};

export default authAdmin;