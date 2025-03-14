import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RobotsList = () => {
  const [robots, setRobots] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/robots')
      .then((res) => res.json())
      .then((data) => setRobots(data))
      .catch((err) => console.error('Error al obtener robots:', err));
  }, []);

  const handleRobotClick = (id) => {
    fetch(`http://localhost:3001/robots/${id}`)
      .then((res) => res.json())
      .then((data) => setSelectedRobot(data))
      .catch((err) => console.error('Error al obtener detalle del robot:', err));
  };

  return (
    <div className="container-fluid px-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className="text-center my-4">Adopta un Robot con Robot Lovers!</h1>
      <div className="text-center mb-4">
        <img
          src="src/public/Banner.png"
          alt="Banner"
          className="img-fluid"
          style={{ width: '100%', maxWidth: '1143px', height: 'auto' }}
        />
      </div>


      <div className="row">
        {/* Tabla */}
        <div className="col-md-8">
          <table className="table table-bordered table-striped">
            <thead className="table-dark text-center">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Modelo</th>
                <th>Empresa Fabricante</th>
              </tr>
            </thead>
            <tbody>
              {robots.map((robot) => (
                <tr
                  key={robot.id}
                  onClick={() => handleRobotClick(robot.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{robot.id}</td>
                  <td>{robot.nombre}</td>
                  <td>{robot.modelo}</td>
                  <td>{robot.empresaFabricante}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detalle */}
        <div className="col-md-4">
          {selectedRobot && (
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">{selectedRobot.nombre}</h5>
                  <img
                  src={selectedRobot.imagen.replace("github.com", "raw.githubusercontent.com").replace("/blob", "")}
                  alt={selectedRobot.nombre}
                  className="img-fluid mb-3"
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                  />
                <p><strong>→ Año de Fabricación:</strong> {selectedRobot.añoFabricacion}</p>
                <p><strong>→ Capacidad de Procesamiento:</strong> {selectedRobot.capacidadProcesamiento}</p>
                <p><strong>→ Humor:</strong> {selectedRobot.humor}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center mt-4 mb-2">
        Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers
      </footer>
    </div>
  );
};

export default RobotsList;
