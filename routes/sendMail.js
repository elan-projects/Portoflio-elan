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
            console.log("Received Data:", body); // Debugging

            // Check if data is JSON or URL-encoded
            let formData;
            try {
                formData = JSON.parse(body);
            } catch (error) {
                formData = querystring.parse(body); // Handle URL-encoded form
            }

            const { senderName, senderEmail, senderSubject, senderMessage } = formData;
            
            if (!senderName || !senderEmail || !senderSubject || !senderMessage) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "All Fields Are Required" }));
                return;
            }

            console.log("Email User:", process.env.EMAIL_USER); // Debugging

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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding-bottom: 10px;">
            <img src="https://i.imgur.com/7I1NX7p.png" alt="Company Logo" width="120">
        </div>
        <h2 style="color: #333; text-align: center;">Thank You for Contacting Us!</h2>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
            Dear Valued Customer,
        </p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
            We have received your inquiry and appreciate you reaching out to us. Our team will review your request and get back to you as soon as possible.
        </p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
            If you have any urgent questions, feel free to reply to this email, and we will assist you promptly.
        </p>
        <div style="text-align: center; margin: 20px 0;">
            <a href="https://yourwebsite.com" style="background-color: #007BFF; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Visit Our Website</a>
        </div>
        <p style="font-size: 16px; color: #555; text-align: center;">
            Best Regards, <br> <strong>Your Company Name</strong> <br> support@yourcompany.com
        </p>
        <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">
        <p style="font-size: 14px; color: #999; text-align: center;">
            This is an automated email. Please do not reply.
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
