import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Button } from 'reactstrap';

import "../components/Pdfmostrar.scss";

function PdfMostrar(data) {
  const [numPages, setNumPages] = useState(null);
  const [file, setFile] = useState(null);

  const handleDownload = async () => {
    const url = URL.createObjectURL(file);
    const response = await fetch(url);
    const blob = await response.blob();
    const a = document.createElement('a');
    const filename = `${file.name}.pdf`;
    const type = 'application/pdf';
    const pdfBlob = new Blob([blob], { type });
    a.href = URL.createObjectURL(pdfBlob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFile = async () => {
    const objeto = data;
    const filename = objeto.data[0].filename;
    console.log(filename);

    const url = 'http://138.117.77.156:3007/api/file/download/'; // Reemplaza con la URL de tu archivo PDF
    const response = await fetch(url + filename);
    const blob = await response.blob();
    setFile(blob);
  };

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  React.useEffect(() => {
    handleFile();
  }, []);

  return (
    <div className="pdf-download">
      <div className="pdf-container">
        <div className="pdf-viewer">
          {file && (
            <Document
              file={file}
              onLoadSuccess={handleLoadSuccess}
              onLoadError={(error) => console.log(error)}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          )}
        </div>
      </div>
      <div>
        {file && <button onClick={handleDownload}>Descargar PDF</button>}
      </div>
    </div>
  );
}

export default PdfMostrar;
