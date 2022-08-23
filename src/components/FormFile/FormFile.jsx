import React from 'react';
import "./form.scss";

const FormFile = () => {
    return (

        <div className='container'>
      
        <h1>Nueva Carga</h1>
        <div className="base-container">
        <div className="form">
            <div className="form-group item1">
                <label htmlFor='Número'>Nombre</label> 
                <input type="text" name="Número"/>
            </div>

            <div className="form-group item2">
                <label htmlFor='Correlativo'>Correlativo</label>
                <input type="text" name="Número"/>
            </div>

            <div className="form-group item3">
                <label htmlFor='Año'>Año</label>
                <input type="text" name="Número"/>
            </div>

            <div className="form-group item4">
                <label htmlFor='Cuerpo'>Cuerpo</label>
                <input type="text" name="Número"/>
            </div>

            <div className="form-group item5">
                <label htmlFor='Iniciador'>Iniciador</label>
                <input type="text" name="Número"/>
            </div>

            <div className="form-group item6">
                <label htmlFor='Asunto'>Asunto</label>
                <input type="text" name="Número"/>
            </div>

            <div className="form-group item7">
                <label htmlFor='Fecha'>Fecha</label>
                <input type="text" name="Número"/>
            </div>
            
            <div className="form-group item8">
            <button type="button" className="btn">Nueva carga</button>
            
            </div>
            
                
                
                
                
        </div>
        </div>   
        </div>   
        

    )
}

export default FormFile;
