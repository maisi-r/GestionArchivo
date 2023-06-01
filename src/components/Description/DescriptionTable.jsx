import React from "react";

import { Document, Page, pdfjs } from "react-pdf";
import PdfMostrar from "../Pdfmostrar";
import { useParams } from "react-router-dom";
import { useGetFileQuery } from "../../store/apis/fileApi";
import SectionContainer from "../Container/SectionContainer/SectionContainer";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Description = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetFileQuery(id);
  console.log(data);
  return (
    <SectionContainer>
      <h3>Detalle</h3>
      {!isLoading && (
        <div className="container">
          <div className="form-group item1">
            <p>Nombre del documento: {data.file.name}</p>
          </div>
          <div className="form-group item2">
            <p>Sistema: {data.file.system}</p>
          </div>
          <div className="form-group item3">
            <p>Descripcion: {data.file.description}</p>
          </div>

          {data.file.additionalInformation ? (
            <div>
              <div className="form-group item1">
                <p>Numero: {data.file.additionalInformation.number}</p>
              </div>
              <div className="form-group item2">
                <p>
                  Correlativo: {data.file.additionalInformation.correlative}
                </p>
              </div>
              <div className="form-group item3">
                <p>Año: {data.file.additionalInformation.year}</p>
              </div>
              <div className="form-group item3">
                <p>Fecha: {data.file.additionalInformation.date}</p>
              </div>
              <div className="form-group item3">
                <p>Cuerpo: {data.file.additionalInformation.body}</p>
              </div>
              <div className="form-group item3">
                <p>Iniciador: {data.file.additionalInformation.initiator}</p>
              </div>
              <div className="form-group item3">
                <p>Asunto: {data.file.additionalInformation.issue}</p>
              </div>
            </div>
          ) : (
            <div>
              <p>No hay información adicional disponible.</p>
            </div>
          )}

          <div className="form-group item3">
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
