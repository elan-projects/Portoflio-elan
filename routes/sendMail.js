const nodemailer = require('nodemailer');
const querystring = require('querystring');
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "config", ".env") });
const emailSender = (req, res) => {
    let body = '';
    req.on("data", chunk => {
        body += chunk;
    });
    req.on("end", async () => {
        try {
            console.log("Received Data:", body); 
            let formData;
            try {
                formData = JSON.parse(body);
            } catch (error) {
                formData = querystring.parse(body); 
            }
            const { senderName, senderEmail, senderSubject, senderMessage } = formData;
            if (!senderName || !senderEmail || !senderSubject || !senderMessage) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "All Fields Are Required" }));
                return;
            }
            console.log("Email User:", process.env.EMAIL_USER); 
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER ,
                    pass: process.env.EMAIL_PASS  ,
                }
            });
            let mailOptions = {
                from: `${senderName} <${senderEmail}>`,
                to: process.env.RECEIVER_EMAIL ,
                subject: senderSubject,
                text: senderMessage,
            };
            let info = await transporter.sendMail(mailOptions);
            console.log("Email Sent:", info.response);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Email Sent Successfully' }));
        } catch (error) {
            console.error("Error Sending the Email:", error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to send Email' }));
        }
    });
};
const sendConfirmationMail = (req,res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", async () => {
        const formData = JSON.parse(body);
        const userEmail = formData.userEmail;
        if (!userEmail) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Email is required!" }));
            return;
        }
        try {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
           let mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "We've Received Your Request - Thank You!",
    html: `
    <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik:ital,wght@0,300..900;1,300..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap');
        </style>
        <div style="background-color:purple;text-align: center; padding-bottom: 10px;">
            <img src="https://i.imgur.com/7I1NX7p.png" alt="ELAN Agency Logo" width="120">
        </div>
        <h2 style="color: #333; text-align: center; font-family: 'Oswald', sans-serif;">Thank You for Reaching Out!</h2>
        <p style="font-size: 16px; color: #555; line-height: 1.6; font-family: 'Rubik', sans-serif;">
            Hi there,
        </p>
        <p style="font-size: 18px; color: #555; line-height: 1.6; font-family: 'Josefin Sans', sans-serif;">
            We’ve received your request and appreciate your interest in working with<spans style="color:purple;font-family:'Bebas Neue',sans-serif;font-size:1.5rem"> ELAN Agency</spans>. Our team is reviewing your inquiry and will get back to you shortly.
        </p>
        <p style="font-size: 16px; color: #555; line-height: 1.6; font-family: 'Josefin Sans', sans-serif;">
            If you have any urgent questions, feel free to reply to this email, and we'll be happy to assist you.
        </p>
        <div style="text-align: center; margin: 20px 0;">
            <a href="https://elanagency.com" style="background-color: purple; color: white; text-decoration: none; padding: 10px 20px; border-radius: 60px; font-size: 16px; font-family: 'Poppins', sans-serif;">Visit Our Website</a>
        </div>
        <p style="font-size: 16px; color: #555; text-align: center; font-family: 'Bebas Neue', sans-serif;">
            Best Regards, <br> <strong>ELAN Agency</strong> <br> elan.devwebapp@gmail.com 
        </p>
        <hr style="border: none; height: 1px; background: purple; margin: 20px 0;">
        <p style="font-size: 14px; color: #999; text-align: center; font-family: 'Source Sans 3', sans-serif;">
        </p>
    </div>
    `,
};
            await transporter.sendMail(mailOptions);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Confirmation email sent successfully!" }));
        } catch (error) {
            console.error("Error sending confirmation email:", error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to send confirmation email" }));
        }
    });
}
module.exports = { emailSender , sendConfirmationMail };
