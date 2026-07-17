import axios from "axios";
import userModel from "../models/userModel.js";
import historyModel from "../models/historyModel.js";
import faqModel from "../models/faqModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const predictUser = async (req, res) => {
  console.log("REQ USER ID =", req.userId);
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    console.log(process.env.ML_API_URL);

    const response = await axios.post(`${process.env.ML_API_URL}/predict`, {
      text,
    });

    const prediction = response.data;

    const probabilities = prediction.result.probabilities;

    // Cari label dengan probabilitas tertinggi
    const dominantLabel = Object.entries(probabilities).sort(
      (a, b) => b[1] - a[1],
    )[0][0];

    // Simpan hanya jika user login
    // Simpan hanya jika user login
if (req.userId) {
console.log("MASUK IF");
  const user = await userModel.findOne({
    userId: req.userId,
  });

  if (user) {
    await historyModel.create({
      userId: user.userId,
      name: user.name,
      email: user.email,
      text,
      prediction: prediction.result.label,
      dominantLabel,
      confidence: prediction.result.confidence,
      probabilities,
    });
  }

}

    res.status(200).json({
      success: true,
      result: {
        ...prediction.result,
        dominantLabel,
      },
    });
  } catch (error) {
    console.log("===== ML ERROR =====");
  console.log(error.message);
  console.log(error.code);
  console.log(error.response?.status);
  console.log(error.response?.data);
  console.log(error.config?.url);

  res.status(500).json({
    success: false,
    message: error.message,
  });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing detail" });
    }

    if (!/^[a-zA-Z\s]{3,50}$/.test(name)) {
      return res.json({ success: false, message: "Enter a valid full name" });
    }

    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
      return res.json({ success: false, message: "Email already registered" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = await userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET);

    res.json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to register user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // Validate password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel
      .findOne({ userId: req.userId })
      .select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserAnalyz = async (req, res) => {
  try {
    const userId = req.userId;

    const history = await historyModel.find({ userId });

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    console.log(error);
  }
};

const getFAQ = async (req, res) => {
  try {
    const faq = await faqModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      faq,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  predictUser,
  loginUser,
  registerUser,
  getUserAnalyz,
  getProfile,
  getFAQ,
};
