import transporter from "./SendMail";

const verifyMail = (options) => {
  const optionsMail = {
    from: process.env.GMAIL_USER,
    to: options.mail,
    subject: options.subject,
    html:
      "<div style =" +
      "width:100%; height:100%;  " +
      "><h1 style=" +
      "font-weight:500>Merhaba, " +
      options.name +
      "<br>vardibileShop'a hoşgeldin</h1><h1>Uygulamamıza kaydolduğunuz için teşekkür ederiz</h1><h3>Doğrulama kodunuz : " +
      options.code +
      " </h3></div><p>Bu istek sizin tarafınızdan yapılmadıysa lütfen bu postayı dikkate almayın.</p><p>Saygılarımızla, <strong>vardibileShop</strong></p>",
  };
  transporter.sendMail(optionsMail, (error, info) => console.log(error));
};

export default verifyMail;
