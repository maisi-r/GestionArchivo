import React from 'react'
import "./formf.scss"

const FormFileInformation = () =>  {
    return (
        <div className='container'>
        <div className='row'>
    <h1>Nueva Carga</h1>
    <div className="base-container">
    <div className="formfile">
        <div className="form-group file1">
            <label htmlFor='Número'>Nombre</label> 
            <input type="text" name="Número"/>
        </div>

        <div className="form-group file2">
            <label htmlFor='Correlativo'>Sistema</label>
            <input type="text" name="Número"/>
        </div>

        <div className="form-group file3">
            <label htmlFor='Año'>Descripción</label>
            <input type="text" name="Número"/>
        </div>

        <div className="form-group file4">
            <label htmlFor='Cuerpo'>Archivo</label>
            <input type="file" name="files"/>
        </div>
        
        <div className="form-group file5">
        <button type="btn btn-primary" className="btn">Nueva carga</button>
        
        </div>
        
            
            
            
            
    </div>
    </div>   
    </div>   
    </div>
    )
  }
 export default FormFileInformation;
