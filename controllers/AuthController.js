import cron from "node-cron";
import asyncHandler from "../middlewares/async";
import verifyMail from "../utilis/verifyMail";
import client from "../config/redis";
import User from "../models/UserModel";

export const RegisterUser = asyncHandler(async (req, res, next) => {
  var uid = "";
  var character = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var characterLength = character.length;

  for (var i = 0; i < 6; i++)
    uid += character.charAt(Math.floor(Math.random() * characterLength));

  const newUser = await User.create({ ...req.body, uid: uid });

  try {
    const options = {
      mail: newUser.email,
      subject: "Hesap Doğrulama",
      code: uid,
      name: newUser.name,
    };

    await verifyMail(options);
    var job = cron.schedule(
      "* 2 * * *",
      async () => {
        try {
          const user1 = await User.findOne({ email: newUser.email });
          if (user1.verify === false) {
            try {
              await User.findByIdAndDelete({ email: user1.email });
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      { scheduled: false }
    );
    job.start();
    res.status(200).send({
      status: "success",
      message: "Doğrulama Kodu e-postanıza gönderildi.",
    });
  } catch (error) {
    throw res.status(500).send("Doğrulama e-postası gönderilemedi");
  }
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ uid: req.body.code });
  if (!user) throw res.status(401).send("Kod geçersiz");

  if (user.verify) throw res.status(401).send("Zaten doğrulandı");
  user.verify = true;

  await user.save({ validateBeforeSave: false });
  sendTokenResponse(user, 200, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    verify: true,
  }).select("+password");
  if (!user) throw res.status(401).send("Email bulunamadı");

  const isPassword = await user.matchPassword(req.body.password);
  if (!isPassword) throw res.status(401).send("Parola yanlış");

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = async (user, statusCode, res) => {
  await user.genAuthToken();
  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    verify: user.verify,
  };
  const data = await client.get(user._id.toHexString());
  const token = JSON.parse(data);

  res.status(statusCode).send({ status: "success", token, authData: userData });
};
