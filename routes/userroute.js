import express from "express";
import { create, deleteuser, getall, getone,  update } from "../controllers/usercontroller.js";
import usercontrol from "../controllers/usercontroller.js"

const route = express.Router();


route.post("/register", usercontrol.register);
route.post("/login", usercontrol.login);
route.post("/Forget", usercontrol.resetpassword);
route.post("/create", create);
route.get("/getall",getall);
route.get("/getone/:id",getone);
route.put("/update/:id",update);
route.delete("/delete/:id",deleteuser);




export default route;