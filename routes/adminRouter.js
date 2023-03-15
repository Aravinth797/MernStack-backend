import express from "express";
import expressAsyncHandler from "express-async-handler";
import Admin from "../models/AdminModel.js";
import bcrypt from "bcryptjs";

const adminRouter = express.Router();

adminRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    console.log("req", req.body);

    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    await admin.save();
  })
);

adminRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    console.log("req", req.body);

    const user = await Admin.findOne({ email: req.body.email });

    console.log("user", user);

    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    await admin.save();
  })
);

export default adminRouter;
