const router = require('express').Router();
const nodemailer = require('nodemailer');

//Contacts route

router.get('/', (req, res) => {
    res.send('contacted');
})

router.post('/', (req, res) => {
    const data = req.body; // 👈 FIXED: define `data` from request

    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: data.email,
        to: 'neetapanditchavan29@gmail.com',
        subject: `Message from ${data.name}.`,
        html: `
            <h3>Informations</h3>
            <ul>
                <li>Name: ${data.name}</li>
                <li>Email: ${data.email}</li>
            </ul>
            <h3>Message</h3>
            <p>${data.message}</p>
        `
    };

    smtpTransport.sendMail(mailOptions, (err, response) => {
        try {
            if (err) return res.status(400).json({ msg: err });
            else return res.status(200).json({ msg: 'Message was sent' });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    });
});






module.exports = router;