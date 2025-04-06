import React, { useState } from 'react';
import axios from 'axios';

function SendEmail() {
  const [form, setForm] = useState({ to: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/send', form);
      setStatus('✅ Correo enviado correctamente');
    } catch (err) {
      console.error(err);
      setStatus('❌ Error al enviar: ' + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Enviar Correo</h2>
      {status && <div className="alert alert-info">{status}</div>}
      <form onSubmit={handleSend}>
        <input name="to" placeholder="Correo destino" className="form-control mb-2" onChange={handleChange} required />
        <input name="subject" placeholder="Asunto" className="form-control mb-2" onChange={handleChange} required />
        <textarea name="message" placeholder="Mensaje" className="form-control mb-2" onChange={handleChange} required />
        <button className="btn btn-primary">Enviar Correo</button>
      </form>
    </div>
  );
}

export default SendEmail;
