import React, { useEffect, useState } from 'react';

function History() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    // Obtener citas guardadas desde localStorage
    const datos = JSON.parse(localStorage.getItem('citas')) || [];
    setCitas(datos);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Historial de Citas</h2>
      {citas.length === 0 ? (
        <p className="text-muted">No tienes citas agendadas aún.</p>
      ) : (
        <ul className="list-group">
          {citas.map((cita, index) => (
            <li key={index} className="list-group-item">
              <strong>Fecha:</strong> {cita.fecha} &nbsp;
              <strong>Hora:</strong> {cita.hora} <br />
              <strong>Motivo:</strong> {cita.motivo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;