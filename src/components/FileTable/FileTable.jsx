import React, { useMemo } from 'react'
import { useGetFilesQuery } from '../../store/apis/fileApi';
import Table from "./Table";

const FileTable = () => {
    

   const { data, isLoading } = useGetFilesQuery();
   console.log(data);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
    ],
    []
  )
    const dataFile = !isLoading && data?.files.map( item => ({firstName: item.name, lastName: item.description})) || [];
  //const data = [{firstName: "Elias", lastName: "Emanuele"}, {firstName: "Elias", lastName: "Emanuele"}, {firstName: "Elias", lastName: "Emanuele"}, {firstName: "Elias", lastName: "Emanuele"}, ]
    console.log(dataFile)

  return (
    !isLoading ? 
    <>
      <Table columns={columns} data={dataFile} />
      <button>Agregar nuevo archivo</button>
    </>
    : 
      <p>Cargando...</p>
  )
}

export default FileTable;