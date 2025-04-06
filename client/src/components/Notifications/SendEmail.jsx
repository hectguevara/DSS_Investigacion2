import React, { useState } from 'react';
import axios from 'axios';

function SendEmail() {
  const [form, setForm] = useState({
    to: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/send', form);
      if (response.status === 200) {
        setStatus('✅ Correo enviado correctamente');
      } else {
        setStatus('❌ Error al enviar el correo');
      }
    } catch (error) {
      setStatus('❌ Falló el envío: ' + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Enviar Correo</h3>
      {status && <div className="alert alert-info">{status}</div>}
      <form onSubmit={handleSend}>
        <input
          name="to"
          placeholder="Correo destino"
          className="form-control mb-2"
          type="email"
          value={form.to}
          onChange={handleChange}
          required
        />
        <input
          name="subject"
          placeholder="Asunto"
          className="form-control mb-2"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Mensaje"
          className="form-control mb-2"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary">Enviar Correo</button>
      </form>
    </div>
  );
}

export default SendEmail;