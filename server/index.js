import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserModel from "./models/Users.js";
import bcrypt from "bcrypt";
import TrailModel from "./models/Trails.js";
import GuideModel from "./models/Guides.js";
import nodemailer from "nodemailer";
import crypto from "node:crypto";
const app = express();

app.use(cors());
app.use(express.json());

// ================= SERVER =================
app.listen(3004, () => {
  console.log("Server Connected at port no 3004");
});

// ================= DATABASE =================
const conStr = process.env.MONGO_URI;
mongoose
  .connect(conStr)
  .then(() => {
    console.log("Database Connected..");
  })
  .catch((error) => {
    console.log("Database Connection Error.." + error);
  });

// ================= USERS =================
app.get("/Users", async (req, res) => {
  try {
    // ✅ تغيّر: ما نرجّع الباسوردات ولا حقول إعادة التعيين
    const users = await UserModel.find({}).select(
      "-password -resetPasswordToken -resetPasswordExpires"
    );
    res.send(users);
  } catch (error) {
    res.send("Read Error.." + error);
  }
});

// ================= USERS COUNT =================
app.get("/usersCount", async (req, res) => {
  try {
    // يعد المستخدمين العاديين فقط (بدون الأدمن)
    const count = await UserModel.countDocuments({ role: { $ne: "admin" } });
    res.send({ count });
  } catch (error) {
    res.status(500).send("Users Count Error.." + error);
  }
});

// ================= REGISTER =================
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
    // ✅ تغيّر: شلنا console.log(newuser) لأنه يطبع الباسورد المشفر
    res.send({ message: "User Registered..." });
  } catch (error) {
    res.send("Read Error.." + error);
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
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
      } else {
        return res.send({ message: "Invalid Credentials" });
      }
    } else {
      return res.send({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.send("Read Error.." + error);
  }
});

// ================= ADD TRAIL =================
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

// ================= GET TRAILS =================
app.get("/getTrails", async (req, res) => {
  try {
    const trails = await TrailModel.find({});
    res.send(trails);
  } catch (error) {
    res.status(500).send("Get Trails Error.." + error);
  }
});

// ================= DELETE TRAIL =================
app.delete("/deleteTrail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await TrailModel.findByIdAndDelete(id);
    res.send({ message: "Trail Deleted Successfully" });
  } catch (error) {
    res.status(500).send("Delete Trail Error.." + error);
  }
});

// ================= EDIT TRAIL =================
app.put("/editTrail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level, governorate, image, description, location, lat, lng } = req.body;

    const updatedTrail = await TrailModel.findByIdAndUpdate(
      id,
      { name, level, governorate, image, description, location, lat, lng },
      { new: true }
    );
    res.send({ message: "Trail Updated Successfully", trail: updatedTrail });
  } catch (error) {
    res.status(500).send("Edit Trail Error.." + error);
  }
});

// ================= ADD GUIDE =================
app.post("/addGuide", async (req, res) => {
  try {
    const { name, specialty, phone, email, gender, image, description } = req.body;

    const newGuide = new GuideModel({
      name, specialty, phone, email, gender, image, description,
    });

    await newGuide.save();
    res.send({ message: "Guide Added Successfully", guide: newGuide });
  } catch (error) {
    console.log(error);
    res.status(500).send("Add Guide Error.." + error);
  }
});

// ================= GET GUIDES =================
app.get("/getGuides", async (req, res) => {
  try {
    const guides = await GuideModel.find({});
    res.send(guides);
  } catch (error) {
    res.status(500).send("Get Guides Error.." + error);
  }
});

// ================= EDIT GUIDE =================
app.put("/editGuide/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialty, phone, email, gender, image, description } = req.body;

    const updatedGuide = await GuideModel.findByIdAndUpdate(
      id,
      { name, specialty, phone, email, gender, image, description },
      { new: true }
    );
    res.send({ message: "Guide Updated Successfully", guide: updatedGuide });
  } catch (error) {
    res.status(500).send("Edit Guide Error.." + error);
  }
});

// ================= DELETE GUIDE =================
app.delete("/deleteGuide/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await GuideModel.findByIdAndDelete(id);
    res.send({ message: "Guide Deleted Successfully" });
  } catch (error) {
    res.status(500).send("Delete Guide Error.." + error);
  }
});

// ================= FORGOT / RESET PASSWORD =================
const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// ✅ جديد: وضع تجريبي، يظهر زر Reset مباشرة (لا تشغلينه في الموقع المنشور)
const DEMO_RESET = process.env.DEMO_RESET === "true";

// 1) طلب إعادة تعيين الباسورد
app.post("/forgot-password", async (req, res) => {
  const generic = {
    message: "If this email is registered, a reset link has been sent.",
  };

  try {
    const email = String(req.body.email || "").trim();
    const user = await UserModel.findOne({ email });

    // ✅ تغيّر: في الوضع التجريبي نخبر الواجهة إن الإيميل غير مسجل
    if (!user) {
      return res.send(
        DEMO_RESET
          ? { exists: false, message: "This email is not registered." }
          : generic
      );
    }

    const token = crypto.randomBytes(32).toString("hex");

    await UserModel.updateOne(
      { _id: user._id },
      {
        $set: {
          resetPasswordToken: hashToken(token),
          resetPasswordExpires: new Date(Date.now() + 30 * 60 * 1000), // 30 دقيقة
        },
      }
    );

    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: `"Epic Trails" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Reset your Epic Trails password",
          html: `
            <p>Hello ${user.username},</p>
            <p>We received a request to reset your password. This link is valid for 30 minutes:</p>
            <p><a href="${link}">Reset my password</a></p>
            <p>If you did not request this, you can ignore this email.</p>
          `,
        });
      } catch (mailError) {
        console.log("Email Error.. " + mailError);
      }
    } else {
      console.log("RESET LINK (dev mode):", link);
    }

    // ✅ جديد: نرجع الكود للواجهة عشان تعرض الزر
    if (DEMO_RESET) {
      return res.send({
        exists: true,
        token,
        message: "Email verified. You can reset your password now.",
      });
    }

    res.send(generic);
  } catch (error) {
    console.log("Forgot Password Error.. " + error);
    res.send(generic);
  }
});

// 2) تعيين الباسورد الجديد
app.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters" });
    }

    const user = await UserModel.findOne({
      resetPasswordToken: hashToken(req.params.token),
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .send({ message: "This reset link is invalid or has expired." });
    }

    const hpwd = await bcrypt.hash(password, 10);

    await UserModel.updateOne(
      { _id: user._id },
      {
        $set: { password: hpwd },
        $unset: { resetPasswordToken: "", resetPasswordExpires: "" },
      }
    );

    res.send({ message: "Password updated successfully" });
  } catch (error) {
    console.log("Reset Password Error.. " + error);
    res.status(500).send({ message: "Could not reset password" });
  }
});

const weatherCache = new Map();
const WEATHER_TTL = 10 * 60 * 1000; // 10 دقايق

app.get("/weather", async (req, res) => {
  try {
    const q = String(req.query.q || "").trim();
    if (!q || q.length > 80) {
      return res.status(400).send({ message: "Invalid location" });
    }

    const hit = weatherCache.get(q);
    if (hit && Date.now() - hit.time < WEATHER_TTL) {
      return res.send(hit.data);
    }

    const url =
      `https://api.weatherapi.com/v1/current.json` +
      `?key=${process.env.WEATHER_API_KEY}&q=${encodeURIComponent(q)}&aqi=no`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .send({ message: data.error?.message || "Weather error" });
    }

    weatherCache.set(q, { time: Date.now(), data });
    res.send(data);
  } catch (error) {
    console.log("Weather Error.. " + error);
    res.status(500).send({ message: "Weather service unavailable" });
  }
});