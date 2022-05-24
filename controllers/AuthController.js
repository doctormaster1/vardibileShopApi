import crypto from "crypto";
import cron from "node-cron";
import asyncHandler from "../middlewares/async";
import verifyMail from "../utilis/verifyMail";
import sendMail from "../utilis/SendMail";
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
      "59 * * * *",
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
    res
      .status(200)
      .send({
        status: "success",
        message: "Doğrulama Kodu e-postanıza gönderildi.",
      });
  } catch (error) {
    throw res.status(500).send("Doğrulama e-postası gönderilemedi");
  }
});
