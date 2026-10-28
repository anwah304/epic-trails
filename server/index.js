import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserModel from "./models/Users.js";
import bcrypt from "bcrypt";
import TrailModel from "./models/Trails.js";
import GuideModel from "./models/Guides.js";

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
    const users = await UserModel.find({});
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
    const { email, username, password, profilepic, gender } = req.body; // ✅ أضفنا gender
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
      gender, // ✅ جديد
      role: "user",
    });

    await newuser.save();
    console.log(newuser);
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
            gender: user.gender, // ✅ جديد
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
    const { name, level, governorate, image, description, location, lat, lng } = req.body; // ✅

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
    const { name, level, governorate, image, description, location, lat, lng } = req.body; // ✅

    const updatedTrail = await TrailModel.findByIdAndUpdate(
      id,
      { name, level, governorate, image, description, location, lat, lng }, // ✅
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