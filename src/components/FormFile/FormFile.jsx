import React from 'react'
import { useAddFileMutation } from '../../store/apis/fileApi'
import "./formf.scss"
import { useFormik } from 'formik';
import * as Yup from "yup"; 

const FormFile = () =>  {

    const [ uploadFile ] = useAddFileMutation();
    const required = "El campo es requerido";
    const formik = useFormik({

        initialValues: {
            name: "",
            system: "",
            description: "",
            file:""
        },

        validationSchema: Yup.object({
            name: Yup.string().required(required),
            system: Yup.string().required(required),
            description: Yup.string().required(required),
        }),
    
        onSubmit: async (values) => {
          try {
            console.log(values);
            //const result = await addInformation({ id : id, data: values});
            formik.resetForm();
          } catch (error) {
            console.log(error);
          }
        },
    });

    const { setFieldValue,handleSubmit, handleChange, handleBlur, values, errors, touched } = formik;

    return (
        <div className='container'>
        <h1>Nueva Carga</h1>
    <div className="base-container">
    
    <form onClick={handleSubmit} className="formfile">
        <div className="form-group file1">
            <label htmlFor='name'>Nombre</label> 
            <input 
            type="text"
            className={ `input__light-${errors.name && touched.name ? 'warning' : 'success'}` }
            placeholder="Ingrese el nombre"
            value={ values.name }
            onBlur={ handleBlur }
            onChange={ handleChange }
            name="name"
            />
            { errors.name && touched.name && (
                <div className='text-red'>
                    <small className="text-red-600">{ errors.name }</small>
                </div>
            )}
        </div>

        <div className="form-group file2">
            <label htmlFor='system'>Sistema</label>
            <input type="text"
            className={ `input__light-${errors.system && touched.system ? 'warning' : 'success'}` }
            placeholder="Ingrese el nombre del Sistema"
            value={ values.system }
            onBlur={ handleBlur }
            onChange={ handleChange }
            name="system"
            />
            { errors.system && touched.system && (
                <div className='text-red'>
                    <small className="text-red-600">{ errors.system }</small>
                </div>
            )}
        </div>

        <div className="form-group file3">
            <label htmlFor='description'>Descripción</label>
            <input type="text"
            className={ `input__light-${errors.description && touched.description ? 'warning' : 'success'}` }
            placeholder="Ingrese una descripción"
            value={ values.description }
            onBlur={ handleBlur }
            onChange={ handleChange }
            name="description"
            />
            { errors.description && touched.description && (
                <div className='text-red'>
                    <small className="text-red-600">{ errors.description }</small>
                </div>
            )}
        </div>

        <div className="form-group file4">
            <label htmlFor='Cuerpo'>Archivo</label>
            <input type="file" name="file" onChange={(event) => {setFieldValue ("file", event.target.file[0])}}/>
        </div>
        
        <div className="form-group file5">
        <button onClick={handleSubmit} type="btn btn-primary" className="btn">Nueva carga</button>
        
        </div>
        
            
            
            
            
    </form>
    </div>   
    </div>
    )
  }
 export default FormFile;
