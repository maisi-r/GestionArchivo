import { BrowserRouter as Router, Link, } from 'react-router-dom';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import style from "./table.scss";
import { BiArrowBack, BiPencil, BiTrash, BiChevronsLeft, BiLineChart, BiChevronsRight, BiChevronLeft, BiChevronRight, BiPlusCircle, BiBookmarkAltPlus, BiZoomIn } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { editOn } from '../../store/slices/idEditSlice';
import { useDeleteFileMutation } from '../../store/apis/fileApi';
import { GlobalFilter } from '../GlobalFilter';


const Table = ({ columns, data, handleEdit, totalItems, handleDownload , table, typeUser = false }) => {
  const dispatch = useDispatch();
  const [deleteFile] = useDeleteFileMutation();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  async function handleDelete(id) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este archivo?',
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cancelar',
      showDenyButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFile(id);
        Swal.fire({ title: "Éxito", text: "Archivo eliminado correctamente", icon: "success", timer: 3500 });
      }
    });
  }

  async function handleDownload(id) {
    fetch(`http://138.117.77.156:3007/api/file/download/${id}`, {
      method: 'get',
      headers: {
        Accept: 'application/octet-stream',
        'Content-Type': 'application/octet-stream'
      }
    }).then((res) => res.json());
  }

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   navigate("/carga");
  // };
  const handleNew = () => {
  };

  const handleDispatchId = (id) => {
    handleEdit();
    
    dispatch(editOn(id));
  };


  useEffect(() => {
    setPageSize(Number(8));
  }, [])
  

  return (
    <>

<div style={{ display: "flex", justifyContent: "flex-end" }}>
  <button style={{ background: "#00aaee", color: "#ffffff" }} className="btn">
    <Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>
      Cerrar Sesión
    </Link>
  </button>
</div>
      <div><GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /></div>

      <div className='Carga'>
        {!typeUser && (
          <Link to="/carga" onClick={handleNew} >
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} className={"Carga"}>
              <BiPlusCircle />Nueva Carga
            </motion.button>
          </Link>

          
        )}
      </div>

      <table className='table table-bordered' {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th  {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
              <th className={style.actions__title}>Acciones</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
                <th className="actions__icons">
                  
                <Link to={`/editar/${row.original.id} `}>
                  
                  
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 1.02 }}
    className={"editar"}
  >
    <BiPencil />
  </motion.button>
</Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.02 }}
                    className={"borrar"}
                    onClick={() => { handleDelete(row.original.id) }}
                  >
                    <BiTrash />
                  </motion.button>
                  {console.log(row.original)}
                  <Link to={`/archivos/descripcion/${row.original.id}`}>
                    <motion.button
                    className={"ver"}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 1.02 }}
                    >
                      <BiZoomIn />
                    </motion.button>
                  </Link>
                </th>
              </tr>
            )
          })}
        </tbody>
      </table>

        <div className="pagination">
          <span>
            Página{' '}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{' '}
          </span>

          <div className="pagination__icon">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {<BiChevronsLeft />}
            </motion.button>{' '}
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => previousPage()} disabled={!canPreviousPage}>
              {<BiChevronLeft />}
            </motion.button>{' '}
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => nextPage()} disabled={!canNextPage}>
              {<BiChevronRight />}
            </motion.button>{' '}
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {<BiChevronsRight />}
            </motion.button>{' '}
          </div>

          <span>
            Total Documentos{' '}
            <strong>
              {totalItems}
            </strong>{' '}
          </span>
        </div>
      </>
  )
}

export default Table;
