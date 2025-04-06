import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function Schedule() {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaCita = { fecha, hora, motivo };
    const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
    citasGuardadas.push(nuevaCita);
    localStorage.setItem('citas', JSON.stringify(citasGuardadas));
    setMensaje('✅ Cita agendada exitosamente');

    // Limpiar campos
    setFecha('');
    setHora('');
    setMotivo('');

    // Enviar correo automáticamente
    try {
      await axios.post('http://localhost:3001/send', {
        to: user.email || 'test@mailtrap.io', // si el usuario no tiene correo real
        subject: 'Cita confirmada',
        message: `Hola ${user.name}, tu cita fue agendada para el ${fecha} a las ${hora}.`
      });
      console.log('✅ Correo enviado por cita');
    } catch (error) {
      console.error('❌ Error al enviar correo por cita:', error.message);
    }    
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Agendar Cita</h2>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        <input type="time" className="form-control" value={hora} onChange={(e) => setHora(e.target.value)} required />
        <textarea placeholder="Motivo de la cita" className="form-control" value={motivo} onChange={(e) => setMotivo(e.target.value)} required></textarea>
        <button className="btn btn-primary">Agendar</button>
      </form>
    </div>
  );
}

export default Schedule;
