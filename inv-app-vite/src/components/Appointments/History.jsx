import React, { useEffect, useState } from 'react';

function History() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('citas')) || [];
    setCitas(datos);
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Historial de Citas</h2>
      <div className="d-flex flex-column gap-3">
        {citas.length === 0 ? (
          <p className="text-muted">No tienes citas agendadas aún.</p>
        ) : (
          citas.map((cita, index) => (
            <div key={index} className="card p-3 shadow-sm">
              <p><strong>Fecha:</strong> {cita.fecha}</p>
              <p><strong>Hora:</strong> {cita.hora}</p>
              <p><strong>Motivo:</strong> {cita.motivo}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;