import React, { useMemo } from 'react'
import { useGetFilesQuery } from '../../store/apis/fileApi';
import SectionContainer from '../../components/container/SectionContainer/SectionContainer';
import Table from "./Table";
import { BiGroup } from "react-icons/bi";
import openModalUser from "./openModalDoc";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FileTable = () => {

  

 

  const { data: dataDoc, isLoading : isLoadingDoc } = useGetFilesQuery();

  

  const dataTableDoc= () => dataDoc?.files?.map( item => 
    ({ tipodocumento: item.name, descripcion: item.description || "", id:item._id }));

  
 

  

  

  const columnsDoc = useMemo(
      () => [
            {
              Header: 'Tipo de Documento',
              accessor: 'tipodocumento',
            },
            {
              Header: 'Descripción',
              accessor: 'descripcion',
            },
          ],
      []
    );
          


        

        return (

          

          <SectionContainer>
            
            <h3>Documentos</h3>
            <div className="containerInput">
            

        </div>
            {!isLoadingDoc &&
              <Table
                  
                  columns={columnsDoc}
                  data={ dataTableDoc() }
                  icon={ <BiGroup /> } 
                  tableType="documentos"
                  totalItems={ dataDoc.totalItems}
                  handleNew={ () => openModalUser("new") }
                  handleEdit={ () => openModalUser("edit") }  
                                  
              />
              
            }
          </SectionContainer>

  )
}

export default FileTable;




// const FileTable = () => {

//   const navigate = useNavigate();


//    const { data, isLoading } = useGetFilesQuery();

//   const columns = useMemo(
//     () => [
//       {
//         Header: 'Name',
//         columns: [
//           {
//             Header: 'First Name',
//             accessor: 'firstName',
//           },
//           {
//             Header: 'Last Name',
//             accessor: 'lastName',
//           },
//         ],
//       },
//     ],
//     []
//   )
//     const dataFile = !isLoading && data?.files.map( item => ({firstName: item.name, lastName: item.description})) || [];
//   //const data = [{firstName: "Elias", lastName: "Emanuele"}, {firstName: "Elias", lastName: "Emanuele"}, {firstName: "Elias", lastName: "Emanuele"}, {firstName: "Elias", lastName: "Emanuele"}, ]
//     console.log(dataFile)

//     const goHome = () => {
//                 navigate
//       ("/carga")
//               };

//   return (
//     !isLoading ?
//     <>
//       <Table columns={columns} data={dataFile} />
//     </>
//     :
//       <p>Cargando...</p>
//   )
// }

// export default FileTable;