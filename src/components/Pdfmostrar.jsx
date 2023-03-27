import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfMostrar(data) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null);

  const handleFile = async (event) => {
    
    const objeto = data;
    const filename = objeto.data[0].filename;
    console.log(filename);

    
    const url = 'http://138.117.77.156:3007/api/file/download/'; // Reemplaza con la URL de tu archivo PDF
    const response = await fetch(url+filename);
    const blob = await response.blob();
    setFile(blob);
  };

  return (
    <div>
      <button onClick={handleFile}>Mostrar archivo PDF</button>
      {file && (
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(error) => console.log(error)}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      )}
      <p>
        Página {pageNumber} de {numPages}
      </p>
    </div>
  );
}

export default PdfMostrar;


import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

function FileViewer() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    // Llamada a la API para obtener el archivo
    fetch("https://tu-api.com/archivo.pdf")
      .then((response) => response.blob())
      .then((data) => {
        setFile(data);
      })
      .catch((error) => console.log(error));
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      {file && file.type === "application/pdf" && (
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )}
      {file && file.type.startsWith("image/") && (
        <img src={URL.createObjectURL(file)} alt="Archivo de imagen" />
      )}
    </div>
  );
}

export default FileViewer;
En este ejemplo, usamos useState para almacenar el archivo que recibimos de la API y useEffect para hacer la llamada a la API en el momento en que se monta el componente. Luego, verificamos si el archivo es un PDF o una imagen y mostramos el contenido correspondiente utilizando react-pdf para los PDFs y la etiqueta img para las imágenes.

Ten en cuenta que este es solo un ejemplo básico y que necesitarás adaptarlo a tu propia API y a las necesidades específicas de tu proyecto.





