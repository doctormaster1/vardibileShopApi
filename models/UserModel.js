import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { genToken } from "../utilis/genToken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Lütfen adınızı girin!"],
    trim: true,
  },
  uid: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Lütfen email adresinizi girin!"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Geçersiz karakterler!!!",
    ],
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, "Parolanız 8 karakterden fazla olmalı"],
    required: [true, "Lütfen parola girin"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  verify: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ userId: this._id });
  await this.model("Order").deleteMany({ userId: this._id });
  next();
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const SaltFactor = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, SaltFactor);
  next();
});

UserSchema.methods.genAuthToken = function () {
  return genToken(this._id.toHexString());
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;
