import React, { useMemo } from 'react'
import Table from "./Table";

const FileTable = () => {
    
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

  const data = [{firstName: "Elias", lastName: "Emanuele"}, {firstName: "Elias", lastName: "Emanuele"}, {firstName: "Elias", lastName: "Emanuele"}, {firstName: "Elias", lastName: "Emanuele"}, ]


  return (
    <Table columns={columns} data={data} />
  )
}

export default FileTable;