import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";

import UrlRoutes from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js";
import userRoute from "./routes/user.js";
import { resticToLoginUserOnly, checkAuth } from "./middleware/auth.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

main()
  .then(() => console.log("Mongodb is connected"))
  .catch((err) => console.log("error in db", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/shortUrl");
}

//Router
app.use("/url", resticToLoginUserOnly, UrlRoutes);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is listing in port ${PORT}`);
});
