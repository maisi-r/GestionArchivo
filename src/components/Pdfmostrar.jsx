import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function PdfMostrar(data) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFile = async () => {
    const objeto = data;
    const filename = objeto.data[0].filename;
    console.log(filename);

    const url = 'http://138.117.77.156:3007/api/file/download/'; // Reemplaza con la URL de tu archivo PDF
    const response = await fetch(url + filename);
    const blob = await response.blob();
    setFile(blob);
  };

  useEffect(() => {
    handleFile();
  }, []);

  const handleDownload = async () => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    const filename = `${file.name}.pdf`;
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="pdf-download">
      <div className="pdf-viewer">
        {file && (
          <Viewer
            fileUrl={URL.createObjectURL(file)}
            plugins={[defaultLayoutPlugin]}
            defaultScale={SpecialZoomLevel.PageFit} // Configura el nivel de zoom inicial
            defaultLayout="SinglePage" // Configura el diseño de visualización inicial
          />
        )}
      </div>
      <div className="row">
        <div className="col-12">
          {file && (
            <Button color="primary" onClick={handleDownload}>
              Descargar PDF
            </Button>
          )}
          <Button onClick={() => navigate(-1)}>Volver</Button>
        </div>
      </div>
    </div>
  );
}

export default PdfMostrar;
