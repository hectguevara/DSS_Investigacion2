const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  const { to, subject, message } = req.body;

  console.log('📩 Datos recibidos:', { to, subject, message });

  try {
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      secure: false,
      auth: {
        user: '6beac855ba8924',
        pass: '6fd79bada4e7d3'
      }
    });

    const info = await transporter.sendMail({
      from: '"HealthApp" <smtpds2025@gmail.com>',
      to,
      subject,
      text: message
    });

    console.log('✅ Correo enviado:', info.response);
    res.status(200).json({ success: true, message: 'Correo enviado correctamente' });

  } catch (err) {
    console.error('❌ Error al enviar:', err);
    res.status(500).json({ success: false, message: 'Error interno', error: err.message });
  }
});

app.listen(3001, () => {
  console.log('🚀 Servidor escuchando en http://localhost:3001');
});
