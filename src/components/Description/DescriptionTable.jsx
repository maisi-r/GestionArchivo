import React from 'react';
import SectionContainer from '../../components/container/SectionContainer/SectionContainer';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfMostrar from '../Pdfmostrar';
import { useParams } from 'react-router-dom';
import { useGetFileQuery } from '../../store/apis/fileApi';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Description = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetFileQuery(id);
  console.log(data)
  return (
    <SectionContainer>
      <h3>Detalle</h3>
      {!isLoading && (
        <div className="container">
          <div className="form-group file1">
            <p>Nombre del documento: {data.file.name}</p>
          </div>
          <div className="form-group file2">
          <p>Descripcion: {data.file.description}</p>
          </div>

          {data.file.additionalInformation ? (
            <div>
              <div className="form-group file3">
                <p>Numero: {data.file.additionalInformation.number}</p>
              </div>
              <div className="form-group file4">
                <p>Correlativo: {data.file.additionalInformation.correlative}</p>
              </div>
              <div className="form-group file5">
                <p>Año: {data.file.additionalInformation.year}</p>
              </div>
              <div className="form-group file6">
                <p>Fecha: {data.file.additionalInformation.date}</p>
              </div>
              <div className="form-group file7">
                <p>Cuerpo: {data.file.additionalInformation.body}</p>
              </div>
              <div className="form-group file8">
                <p>Iniciador: {data.file.additionalInformation.initiator}</p>
              </div>
              <div className="form-group file9">
                <p>Asunto: {data.file.additionalInformation.issue}</p>
              </div>
            </div>
          ) : (
            <div>
              <p>No hay información adicional disponible.</p>
            </div>
          )}

          <div className="form-group file10">
            <p>
              <PdfMostrar data={data.file.files}></PdfMostrar>
            </p>
          </div>
          </div>
      )}
    </SectionContainer>
  );
};

export default Description;
