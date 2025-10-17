import User from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";

export async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    const data = await User.create({
      name,
      email,
      password,
    });
    return res.status(200).redirect("/");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    console.log("Found user:", user);
    if (!user)
      return res.status(401).render("login", {
        error: "Invalid username and password",
      });
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.status(200).redirect("/");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
