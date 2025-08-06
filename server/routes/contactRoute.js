const router = require("express").Router();
const nodemailer = require("nodemailer");

// ========== Contact Routes ========== //

// @route   GET /contact
// @desc    Simple test route
router.get("/", (req, res) => {
  res.send("Contact route is working.");
});

// @route   POST /contact
// @desc    Send email using nodemailer
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: "Please fill in all required fields." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: "neetapanditchavan29@gmail.com",
      subject: `Message from ${name}`,
      html: `
                <h3>Sender Details</h3>
                <ul>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                </ul>
                <h3>Message</h3>
                <p>${message}</p>
            `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: "Message was sent successfully." });
  } catch (error) {
    console.error("Email sending error:", error);
    res
      .status(500)
      .json({ msg: "Failed to send message. Please try again later." });
  }
});

module.exports = router;
