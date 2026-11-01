import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "node:crypto";
import UserModel from "./models/Users.js";
import TrailModel from "./models/Trails.js";
import GuideModel from "./models/Guides.js";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3004, () => {
  console.log("Server Connected at port no 3004");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected.."))
  .catch((error) => console.log("Database Connection Error.." + error));

app.get("/Users", async (req, res) => {
  try {
    const users = await UserModel.find({}).select(
      "-password -resetPasswordToken -resetPasswordExpires -resetPasswordAttempts"
    );
    res.send(users);
  } catch (error) {
    res.send("Read Error.." + error);
  }
});

app.get("/usersCount", async (req, res) => {
  try {
    const count = await UserModel.countDocuments({ role: { $ne: "admin" } });
    res.send({ count });
  } catch (error) {
    res.status(500).send("Users Count Error.." + error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, username, password, profilepic, gender } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.send({ message: "User Exists" });
    }

    const hpwd = await bcrypt.hash(password, 10);

    const newuser = new UserModel({
      email,
      username,
      password: hpwd,
      profilepic,
      gender,
      role: "user",
    });

    await newuser.save();
    res.send({ message: "User Registered..." });
  } catch (error) {
    res.send("Read Error.." + error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.send({
        message: "success",
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
          profilepic: user.profilepic,
          gender: user.gender,
          role: user.role,
        },
      });
    }

    res.send({ message: "Invalid Credentials" });
  } catch (error) {
    res.send("Read Error.." + error);
  }
});

app.get("/favorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).send({ message: "Invalid user" });
    }

    const user = await UserModel.findById(userId).select("favorites");
    if (!user) return res.status(404).send({ message: "User not found" });

    res.send({ favorites: user.favorites || [] });
  } catch (error) {
    res.status(500).send({ message: "Get Favorites Error.." + error });
  }
});

app.post("/favorites/toggle", async (req, res) => {
  try {
    const { userId, trailId } = req.body;
    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(trailId)) {
      return res.status(400).send({ message: "Invalid data" });
    }

    const user = await UserModel.findById(userId).select("favorites");
    if (!user) return res.status(404).send({ message: "User not found" });

    const exists = user.favorites.includes(trailId);

    await UserModel.updateOne(
      { _id: userId },
      exists ? { $pull: { favorites: trailId } } : { $addToSet: { favorites: trailId } }
    );

    const updated = await UserModel.findById(userId).select("favorites");
    res.send({ favorites: updated.favorites });
  } catch (error) {
    res.status(500).send({ message: "Toggle Favorite Error.." + error });
  }
});

app.post("/addTrail", async (req, res) => {
  try {
    const { name, level, governorate, image, description, location, lat, lng } = req.body;

    const newTrail = new TrailModel({
      name,
      level,
      governorate,
      image,
      description,
      location,
      lat,
      lng,
    });

    await newTrail.save();
    res.send({ message: "Trail Added Successfully", trail: newTrail });
  } catch (error) {
    res.status(500).send("Add Trail Error.." + error);
  }
});

app.get("/getTrails", async (req, res) => {
  try {
    const trails = await TrailModel.find({});
    res.send(trails);
  } catch (error) {
    res.status(500).send("Get Trails Error.." + error);
  }
});

app.delete("/deleteTrail/:id", async (req, res) => {
  try {
    await TrailModel.findByIdAndDelete(req.params.id);
    await UserModel.updateMany({}, { $pull: { favorites: req.params.id } }); // ✅ جديد
    res.send({ message: "Trail Deleted Successfully" });
  } catch (error) {
    res.status(500).send("Delete Trail Error.." + error);
  }
});
app.put("/editTrail/:id", async (req, res) => {
  try {
    const { name, level, governorate, image, description, location, lat, lng } = req.body;

    const updatedTrail = await TrailModel.findByIdAndUpdate(
      req.params.id,
      { name, level, governorate, image, description, location, lat, lng },
      { new: true }
    );
    res.send({ message: "Trail Updated Successfully", trail: updatedTrail });
  } catch (error) {
    res.status(500).send("Edit Trail Error.." + error);
  }
});

app.post("/addGuide", async (req, res) => {
  try {
    const { name, specialty, phone, email, gender, image, description } = req.body;

    const newGuide = new GuideModel({
      name,
      specialty,
      phone,
      email,
      gender,
      image,
      description,
    });

    await newGuide.save();
    res.send({ message: "Guide Added Successfully", guide: newGuide });
  } catch (error) {
    res.status(500).send("Add Guide Error.." + error);
  }
});

app.get("/getGuides", async (req, res) => {
  try {
    const guides = await GuideModel.find({});
    res.send(guides);
  } catch (error) {
    res.status(500).send("Get Guides Error.." + error);
  }
});

app.put("/editGuide/:id", async (req, res) => {
  try {
    const { name, specialty, phone, email, gender, image, description } = req.body;

    const updatedGuide = await GuideModel.findByIdAndUpdate(
      req.params.id,
      { name, specialty, phone, email, gender, image, description },
      { new: true }
    );
    res.send({ message: "Guide Updated Successfully", guide: updatedGuide });
  } catch (error) {
    res.status(500).send("Edit Guide Error.." + error);
  }
});

app.delete("/deleteGuide/:id", async (req, res) => {
  try {
    await GuideModel.findByIdAndDelete(req.params.id);
    res.send({ message: "Guide Deleted Successfully" });
  } catch (error) {
    res.status(500).send("Delete Guide Error.." + error);
  }
});

const OTP_TTL_MS = 10 * 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;
const OTP_RESEND_MS = 60 * 1000;

const clearOtp = {
  resetPasswordToken: "",
  resetPasswordExpires: "",
  resetPasswordAttempts: "",
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

app.post("/forgot-password", async (req, res) => {
  const generic = {
    message: "If this email is registered, a verification code has been sent.",
  };

  try {
    const email = String(req.body.email || "").trim();
    const user = await UserModel.findOne({ email });

    if (!user) return res.send(generic);

    const sentAt = user.resetPasswordExpires
      ? user.resetPasswordExpires.getTime() - OTP_TTL_MS
      : 0;
    if (Date.now() - sentAt < OTP_RESEND_MS) return res.send(generic);

    const otp = String(crypto.randomInt(0, 1000000)).padStart(6, "0");
    const otpHash = await bcrypt.hash(otp, 10);

    await UserModel.updateOne(
      { _id: user._id },
      {
        $set: {
          resetPasswordToken: otpHash,
          resetPasswordExpires: new Date(Date.now() + OTP_TTL_MS),
          resetPasswordAttempts: 0,
        },
      }
    );

    try {
      await transporter.sendMail({
        from: `"Epic Trails" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Your Epic Trails verification code",
        html: `
          <p>Hello ${user.username},</p>
          <p>Your verification code is:</p>
          <h2 style="letter-spacing:6px;">${otp}</h2>
          <p>It is valid for 10 minutes. If you did not request this, you can ignore this email.</p>
        `,
      });
    } catch (mailError) {
      console.log("Email Error.. " + mailError);
    }

    res.send(generic);
  } catch (error) {
    console.log("Forgot Password Error.. " + error);
    res.send(generic);
  }
});

app.post("/reset-password", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim();
    const otp = String(req.body.otp || "").trim();
    const { password } = req.body;

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).send({ message: "Enter the 6-digit code." });
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters" });
    }

    const invalidCode = { message: "Invalid or expired code." };
    const user = await UserModel.findOne({ email });

    if (
      !user ||
      !user.resetPasswordToken ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < new Date()
    ) {
      return res.status(400).send(invalidCode);
    }

    const match = await bcrypt.compare(otp, user.resetPasswordToken);

    if (!match) {
      const attempts = (user.resetPasswordAttempts || 0) + 1;

      if (attempts >= OTP_MAX_ATTEMPTS) {
        await UserModel.updateOne({ _id: user._id }, { $unset: clearOtp });
        return res.status(400).send({
          message: "Too many wrong attempts. Please request a new code.",
        });
      }

      await UserModel.updateOne(
        { _id: user._id },
        { $set: { resetPasswordAttempts: attempts } }
      );
      return res.status(400).send({
        message: `Invalid code. ${OTP_MAX_ATTEMPTS - attempts} attempts left.`,
      });
    }

    const hpwd = await bcrypt.hash(password, 10);

    await UserModel.updateOne(
      { _id: user._id },
      { $set: { password: hpwd }, $unset: clearOtp }
    );

    res.send({ message: "Password updated successfully" });
  } catch (error) {
    console.log("Reset Password Error.. " + error);
    res.status(500).send({ message: "Could not reset password" });
  }
});