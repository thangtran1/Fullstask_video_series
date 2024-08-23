require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD
    },
  });

  async function main() {
    try {

      const info = await transporter.sendMail({
        from: '"Hỏi Dân IT 👻" <thangtrandz04@gmail.com>',
        to: dataSend.receverEmail,
        subject: "Thông tin đặt lịch khám bệnh", // Tiêu đề
        html: getBodyHTMLEmail(dataSend),
      });
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  await main(); // Gọi hàm main
};
let getBodyHTMLEmail = (dataSend) => {
  let result = '';
  if (dataSend.language === 'vi') {
    result = `
                 <html>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333333; text-align: center;">Appointment Information</h2>
      
      <div style="margin-bottom: 20px;">
        <p style="font-size: 16px; color: #555555;">Hello, <strong>${dataSend.patientName}</strong>!</p>
        <p style="font-size: 16px; color: #555555;">You received this email because you made an online appointment on Hỏi Dân IT.</p>
      </div>

      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
        <h3 style="color: #333333; margin-top: 0;">Appointment Details:</h3>
        <p style="font-size: 16px; color: #555555;"><strong>Time:</strong> ${dataSend.time}</p>
        <p style="font-size: 16px; color: #555555;"><strong>Doctor:</strong> ${dataSend.doctorName}</p>
      </div>

      <p style="font-size: 16px; color: #555555;">If the above information is correct, please click the link below to confirm and complete your appointment:</p>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="${dataSend.redirectLink}" target="_blank" style="padding: 15px 25px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">Confirm Appointment</a>
      </div>

      <p style="font-size: 16px; color: #555555;">Thank you very much!</p>
    </div>
  </body>
</html>
                `
  }
  if (dataSend.language === 'en') {
    result = `
                  <html>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333333; text-align: center;">Appointment Information</h2>
      
      <div style="margin-bottom: 20px;">
        <p style="font-size: 16px; color: #555555;">Hello, <strong>${dataSend.patientName}</strong>!</p>
        <p style="font-size: 16px; color: #555555;">You received this email because you made an online appointment on Hỏi Dân IT.</p>
      </div>

      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
        <h3 style="color: #333333; margin-top: 0;">Appointment Details:</h3>
        <p style="font-size: 16px; color: #555555;"><strong>Time:</strong> ${dataSend.time}</p>
        <p style="font-size: 16px; color: #555555;"><strong>Doctor:</strong> ${dataSend.doctorName}</p>
      </div>

      <p style="font-size: 16px; color: #555555;">If the above information is correct, please click the link below to confirm and complete your appointment:</p>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="${dataSend.redirectLink}" target="_blank" style="padding: 15px 25px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">Confirm Appointment</a>
      </div>

      <p style="font-size: 16px; color: #555555;">Thank you very much!</p>
    </div>
  </body>
</html>
`
  }
  return result;
}


module.exports = {
  sendSimpleEmail: sendSimpleEmail
}