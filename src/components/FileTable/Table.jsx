import { useTable, usePagination,useGlobalFilter } from 'react-table'
import style from "./table.scss"
import { BiPencil, BiTrash, BiChevronsLeft,BiLineChart, BiChevronsRight, BiChevronLeft, BiChevronRight, BiPlusCircle, BiBookmarkAltPlus,BiZoomIn } from "react-icons/bi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editOn } from '../../store/slices/idEditSlice';
import { Link } from "react-router-dom";
import { useDeleteFileMutation } from '../../store/apis/fileApi';
import Busqueda from '../busqueda';
import { GlobalFilter } from '../GlobalFilter';

const Table = ({ columns, data,handleEdit, totalItems,handleDownload,table, typeUser = false }) => {
    // Use the state and functions returned from useTable to build your UI
    const dispatch = useDispatch();  
    const [deleteFile] = useDeleteFileMutation();
    const navigate = useNavigate();
    
   
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      row,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      state,
      setGlobalFilter,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable({
      columns,
      data,
      initialState: { pageIndex: 0 },
      
  },useGlobalFilter,usePagination
  
      
    )

    const {globalFilter} = state
    

    async function handleDelete(id) {
      console.log(id)
              Swal.fire({title: '¿Esta seguro que desea elminar este archivo?', confirmButtonText: 'Eliminar', denyButtonText: `Cancelar`, showDenyButton: true,})
                  .then(async (result) => {
                      if (result.isConfirmed) {
                          await deleteFile(id);
                          Swal.fire({ title: "Exito", text: "Archivo Eliminado correctamente", icon: "success", timer: 3500 });
                      }
                  })
                
             }

  async function handleDownload (id){
    fetch(' http://138.117.77.156:3007/api/file/download' + id, {
        method: 'get',
        headers: {
            Accept: 'application/octet-stream',
            'Content-Type': 'application/octet-stream'
        }
    }).then((res) => res.json());
  };
    
              
            

    const handleNew = () => {
      navigate
("/carga")
    };

    function handleDispatchId(id) {
      dispatch(editOn(id));
  }

  useEffect(() => {
      setPageSize(Number(10));
  }, [])
  
    // Render the UI for your table
    return (

      <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      { !typeUser &&
                        
                        <motion.button  whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }}  onClick={handleNew} className={style.table__headerButton}><BiPlusCircle />Nueva Carga</motion.button>
                        
                        
                    }
                    
      
      <table className='table table-bordered' {...getTableProps()}>
      
        
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                
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
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}
                  </td>
                  
                  
                })}

                                        
                                        <th className={style.actions__icons}>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 1.02 }}
                                                onClick={ () => { handleDispatchId(row.original.id); handleEdit()} }
                                            >
                                                <BiPencil />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 1.02 }}
                                                onClick={() => {handleDelete(row.original.id) }}
                                            >
                                                <BiTrash />
                                            </motion.button>


                                           {console.log(row.original)}
                                            <Link to={`/archivos/descripcion/${row.original.id}`}>
                                              <motion.button
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
      {/* PAGINATION */}
      <div className={style.pagination}>

      <span>
          Página{' '}
          <strong>
              {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
      </span>

      <div className={style.pagination__icons}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              { <BiChevronsLeft /> }
          </motion.button>{' '}
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => previousPage()} disabled={!canPreviousPage}>
              { <BiChevronLeft /> }
          </motion.button>{' '}
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => nextPage()} disabled={!canNextPage}>
              { <BiChevronRight /> }
          </motion.button>{' '}
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              { <BiChevronsRight /> }
          </motion.button>{' '}
      </div>

      <span>
          Total items{' '}
          <strong>
              {totalItems}
          </strong>{' '}
      </span>{' '}
  </div>
  
  </>
    )
}


export default Table;
