import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import historyModel from "../models/historyModel.js";
import faqModel from "../models/faqModel.js";

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await userModel.findOne({ email });

    if (!admin) {
      return res.json({ success: false, message: "Admin not found" });
    }

    if (admin.role !== "admin") {
      return res.json({ success: false, message: "Access denied" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const atoken = jwt.sign(
      {
        userId: admin.userId,
        role: admin.role,
      },
      process.env.ADMIN_JWT_SECRET,
    );

    res.json({ success: true, message: "Login successful", atoken });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to login admin" });
  }
};

const createAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin1234", 10);

    const admin = await userModel.create({
      name: "Nahdiah",
      email: "adminbicara@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    res.json({
      success: true,
      admin,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const dashboard = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments({
      role: "user",
    });

    const totalDetection = await historyModel.countDocuments();

    const totalFAQ = await faqModel.countDocuments();

    const anxiety = await historyModel.countDocuments({
      prediction: "Anxiety",
    });

    const depression = await historyModel.countDocuments({
      prediction: "Depression",
    });

    const normal = await historyModel.countDocuments({
      prediction: "Normal",
    });

    const suicidal = await historyModel.countDocuments({
      prediction: "Suicidal",
    });

    const statistics = {
      Anxiety: anxiety,
      Depression: depression,
      Normal: normal,
      Suicidal: suicidal,
    };

    const detectedUsers = await historyModel.distinct("userId");

    const detectionRate =
      totalUsers === 0
        ? 0
        : ((detectedUsers.length / totalUsers) * 100).toFixed(1);

    const confidenceResult = await historyModel.aggregate([
      {
        $group: {
          _id: null,
          avg: {
            $avg: "$confidence",
          },
        },
      },
    ]);

    const averageConfidence =
      confidenceResult.length > 0
        ? Number(confidenceResult[0].avg.toFixed(2))
        : 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const detectionToday = await historyModel.countDocuments({
      createdAt: {
        $gte: today,
      },
    });

    const [label, total] = Object.entries(statistics).sort(
      (a, b) => b[1] - a[1],
    )[0];

    const mostDetected = {
      label,
      total,
    };

    res.json({
      success: true,
      dashboard: {
        totalUsers,
        totalDetection,
        totalFAQ,
        totalCategories: 4,
        detectionRate,
        averageConfidence,
        detectionToday,
        mostDetected,
        statistics,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
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

const addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.json({
        success: false,
        message: "Question and answer are required",
      });
    }

    const faq = await faqModel.create({
      question,

      answer,

      createdBy: req.adminId,
    });

    res.json({
      success: true,

      message: "FAQ created successfully",

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

const updateFAQ = async (req, res) => {
  try {
    const { faqId } = req.params;

    const { question, answer } = req.body;

    const faq = await faqModel.findOneAndUpdate(
      { faqId: faqId },

      {
        question,
        answer,
      },

      {
        new: true,
      },
    );

    if (!faq) {
      return res.json({
        success: false,

        message: "FAQ not found",
      });
    }

    res.json({
      success: true,

      message: "FAQ updated",

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

const deleteFAQ = async (req, res) => {
  try {
    const { faqId } = req.params;

    const faq = await faqModel.findOneAndDelete(faqId);

    if (!faq) {
      return res.json({
        success: false,

        message: "FAQ not found",
      });
    }

    res.json({
      success: true,

      message: "FAQ deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getAllHistory = async (req, res) => {
  try {
    const history = await historyModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      history,
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
  loginAdmin,
  createAdmin,
  dashboard,
  getFAQ,
  addFAQ,
  updateFAQ,
  deleteFAQ,
  getAllHistory,
};
