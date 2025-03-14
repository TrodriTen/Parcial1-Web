import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

function RobotDetail() {
  const { id } = useParams();
  const [robot, setRobot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/robots/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRobot(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="text-center my-5">
        <FormattedMessage id="loading" defaultMessage="Cargando detalles..." />
      </div>
    );

  if (!robot)
    return (
      <div className="text-center my-5">
        <FormattedMessage id="notFound" defaultMessage="Robot no encontrado" />
      </div>
    );

  return (
    <div className="container my-5">
      <Link to="/robots" className="btn btn-outline-secondary mb-4">
        &larr; <FormattedMessage id="backToList" defaultMessage="Volver al listado" />
      </Link>

      <div className="card shadow-lg">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={robot.imagen}
              alt={robot.nombre}
              className="img-fluid rounded-start card-img-detail"
            />
          </div>
          <div className="col-md-6">
            <div className="card-body p-4">
              <h1 className="card-title mb-4">{robot.nombre}</h1>
              <div className="robot-info">
                <p>
                  <strong><FormattedMessage id="model" defaultMessage="Modelo" />:</strong> {robot.modelo}
                </p>
                <p>
                  <strong><FormattedMessage id="manufacturer" defaultMessage="Fabricante" />:</strong> {robot.empresaFabricante}
                </p>
                <p>
                  <strong><FormattedMessage id="year" defaultMessage="Año de fabricación" />:</strong> {robot.añoFabricacion}
                </p>
                <p>
                  <strong><FormattedMessage id="processing" defaultMessage="Capacidad de procesamiento" />:</strong> {robot.capacidadProcesamiento}
                </p>
                <p className="mt-4">{robot.humor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RobotDetail;
