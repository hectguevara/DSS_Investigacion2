const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  const { to, subject, message } = req.body;

  // Configurar transporte SMTP con Gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: 'smtpds2025@gmail.com',          // ✅ tu correo Gmail
      pass: 'ohtuoxihknnvhhkq'      // ⚠️ tu App Password, no la contraseña normal
    }
  });

  try {
    await transporter.sendMail({
      from: 'smtpds2025@gmail.com',
      to,
      subject,
      text: message
    });

    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al enviar el correo', error: err });
  }
});

app.listen(3001, () => {
  console.log('✅ Servidor de correo activo en http://localhost:3001');
});
