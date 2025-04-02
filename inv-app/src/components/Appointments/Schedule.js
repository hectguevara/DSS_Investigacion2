import React, { useState } from 'react';

function Schedule() {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // simulacion cita
    const nuevaCita = { fecha, hora, motivo };

    // Guardar en localStorage
    const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
    citasGuardadas.push(nuevaCita);
    localStorage.setItem('citas', JSON.stringify(citasGuardadas));

    // Limpiar formulario
    setFecha('');
    setHora('');
    setMotivo('');
    setMensaje('✅ Cita agendada exitosamente');
  };

  return (
    <div className="container mt-4">
      <h2>Agendar Cita</h2>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          className="form-control mb-2"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <input
          type="time"
          className="form-control mb-2"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        />
        <textarea
          placeholder="Motivo de la cita"
          className="form-control mb-2"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          required
        ></textarea>
        <button className="btn btn-primary">Agendar</button>
      </form>
    </div>
  );
}

export default Schedule;
