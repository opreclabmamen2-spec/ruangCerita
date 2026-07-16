import express from "express";
import authAdmin from "../middlewares/authAdmin.js";
import { createAdmin, loginAdmin, dashboard, getFAQ, addFAQ, updateFAQ, deleteFAQ, getAllHistory } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login-admin", loginAdmin)
adminRouter.post("/add-faq", authAdmin, addFAQ)
adminRouter.put("/update-faq/:faqId", authAdmin, updateFAQ)
adminRouter.delete("/delete-faq/:faqId", authAdmin, deleteFAQ)

adminRouter.get("/dashboard", authAdmin, dashboard)
adminRouter.get("/faq", authAdmin, getFAQ)
adminRouter.get("/history-admin", authAdmin, getAllHistory)

adminRouter.post("/create-admin", createAdmin)

export default adminRouter