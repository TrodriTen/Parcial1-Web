import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RobotsList = () => {
  const [robots, setRobots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/robots')
      .then((res) => res.json())
      .then((data) => setRobots(data))
      .catch((err) => console.error('Error al obtener robots:', err));
  }, []);

  const handleRowClick = (id) => {
    navigate(`/robots/${id}`);
  };

  return (
    <div className="container-fluid mt-4 text-center px-5">
      <h1>Adopta un Robot con Robot Lovers!</h1>
      <img src="src/public/Banner.png" alt="Robots" className="img-fluid my-4" />

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Modelo</th>
            <th>Empresa Fabricante</th>
          </tr>
        </thead>
        <tbody>
          {robots.map((robot) => (
            <tr key={robot.id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(robot.id)}>
              <td>{robot.id}</td>
              <td>{robot.nombre}</td>
              <td>{robot.modelo}</td>
              <td>{robot.empresaFabricante}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="mt-4">
        Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers
      </footer>
    </div>
  );
};

export default RobotsList;
