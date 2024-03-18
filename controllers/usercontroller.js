import User from "../models/usermodel.js";
import People from "../models/peoplemodel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"






class usercontrol {


//  REGISTER USER



static register = async (req, res) => {
  const { fname, lname, gender, role, email, password } = req.body;

  // Check if any required field is null or empty
  if (!fname || !lname || !email || !password || !role || !gender) {
    res.send({ status: "failed", msg: "All fields are required" });
    return;
  }

  // Additional validation for name length
  if (fname.length < 3 || lname.length < 3) {
    res.send({ status: "failed", msg: "Name must be proper" });
    return;
  }
       
  if (password.length < 5) {
    res.send({ status: "failed", msg: "Enter a valid password" });
    return;
  }

  const user = await People.findOne({ email: email });

  if (user) {
    res.send({ status: "failed", msg: "Email already exists" });
  } else {

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const doc = new People({
      fname: fname,
      lname: lname,
      email: email,
      password: hashPass,
      role: role,
      gender: gender,
    });

    await doc.save();

    const save_user = await People.findOne({ email: email });
    const token = jwt.sign({ userID: save_user._id }, process.env.JWT_KEY, { expiresIn: '5d' });

    res.status(201).send({ status: "success", msg: "Registration Success","token":token});
  }
};


//  LOGIN USER

static login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await People.findOne({ email: email });

    if (user) {

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch && user.role.toLowerCase() === role.toLowerCase()) {

        const token = jwt.sign({ userID: user._id }, process.env.JWT_KEY, { expiresIn: '5d' });
        return res.json({ success: true, msg: "Login successfully", token: token });

      } else {

        console.log("Login failed: Incorrect password or role");
        return res.json({ success: false, error: "Login failed, please check credentials" });
      }

    } else {
      console.log("Login failed: User not found");
      return res.json({ success: false, error: "You are not a registered user" });
    }
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}




//  RESET PASSWORD


static resetpassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await People.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ status: 'failed', msg: 'Invalid Email Id' });
    } else {
      if (password.length > 4) {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        
        user.password = hashPass;

        await user.save();
        return res.status(200).json({ status: 'success', msg: 'Password reset successfully' });
      } else {
        return res.status(400).json({ status: 'failed', msg: 'Password must be at least 5 characters long' });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', msg: 'Internal Server Error' });
  }
}


}
  





//  CREATE USER

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(404).json({ msg: "user data not found" });
    }

    const savedata = await userData.save();
    res.status(200).json(savedata);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//  GET USER

export const getall = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ mag: "user data not found !!!" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//  GET ONE USER

export const getone = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "user not found" });
    }

    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//  UPDATE USER

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "user not found" });
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//   DELETE USER

export const deleteuser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


export default usercontrol