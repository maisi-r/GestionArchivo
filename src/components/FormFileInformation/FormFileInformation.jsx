import React from 'react'
import "./formf.scss"
import { useFormik } from 'formik';
import * as Yup from "yup"; 
import { useAddFileMutation } from '../../store/apis/fileApi';
import { useForm } from "react-hook-form";
import { useGetSystemsQuery } from '../../store/apis/systemApi';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";




const FormFileInformation = () =>  {
    
    
    const {data, isLoading} = useGetSystemsQuery();
    const { register, reset, handleSubmit } = useForm();
    const [ uploadFile ] = useAddFileMutation();
    const navigate = useNavigate();
    
 

    const options = !isLoading && data.systems.map( item => ({label: item.name, value: item.name}));

    const onSubmit = async (data) => {  
        
        
        
        const formData = new FormData();
        formData.append("file", data.file[0]);
        formData.append("system", data.system);
        formData.append("name", data.name);
        formData.append("description", data.description);
        
        const result = await uploadFile(formData);
        reset()
        let id = result.data.file._id
        Swal.fire({title: '¿Quiere agregar información adicional a este archivo?', confirmButtonText: 'Si', denyButtonText: `No`, showDenyButton: true,})
                .then(async (result) => {
                    if (result.isConfirmed) {
                        navigate(`/informacion-adicional/${id}`);
                        //await deleteIndicator(id);
                    } else{
                        Swal.fire({ title: "Exito", text: "Archivo guardado correctamente", icon: "success", timer: 3500 });
                        navigate(`/archivos/`);
                    }
                })

    };

   
    
    //const required = "El campo es requerido";
    // const formik = useFormik({

    //     initialValues: {
    //         name: "",
    //         system: "",
    //         description: "",
    //         file: ""
    //     },

    //     validationSchema: Yup.object({
    //         name: Yup.string().required(required),
    //         system: Yup.string().required(required),
    //         description: Yup.string().required(required),
    //     }),
    
    //     onSubmit: async (values) => {
    //       try {
    //         console.log(values.system);
            
    //        ;
    //         // formData.append('name', values.name);
    //         //formData.append('system', values.system);
    //         // formData.append('description', values.description);
            
    //         //formik.resetForm();
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     },
    // });

    // const { setFieldValue,handleSubmit, handleChange, handleBlur, values, errors, touched } = formik;


    return (

        
        
        <div className='container'>
            <h1>Nueva Carga</h1>
            <div className="base-container">
                <form onSubmit={handleSubmit(onSubmit)} className="formfile">
                    <div className="form-group file1">
                        <label htmlFor='name'>Nombre</label> 
                        <input {...register("name")} />
                    </div>

                    <div className="form-group file2">
                        <label htmlFor='name'>Sistema</label> 
                            <select className="select" defaultValue={""}
                                {...register("system")}>
                                    <option value={""} disabled>
                                        Seleccione a que sistema pertenece su archivo
                                    </option>
                                    {!isLoading && options?.map((option, idx) => (
                                        <option key={idx} value={option.value}>{option.label}</option>
                                    ))}
                            </select>
                    </div>

                    <div className="form-group file3">
                        <label htmlFor='name'>Descripción</label> 
                        <input {...register("description")} />
                    </div>

                    

                    <div className="form-group file4">
                        <label htmlFor='name'>Archivo</label> 
                        <input type="file" {...register("file")} />
                    </div>    

                    <div className="form-group file5">         
                    <button type="submit" className="btn">Nueva carga</button>
                    </div>
                </form>
            </div>   
        </div>
    )
  }


//  <form onSubmit={handleSubmit} className="formfile">
                
//  <div className="form-group file1">
//      <label htmlFor='name'>Nombre</label> 
//      <input 
//          type="text"
//          className={ `input__light-${errors.name && touched.name ? 'warning' : 'success'}` }
//          placeholder="Ingrese el nombre"
//          value={ values.name }
//          onBlur={ handleBlur }
//          onChange={ handleChange }
//          name="name"
//      />
//      { errors.name && touched.name && (
//          <div className='text-red'>
//              <small className="text-red-600">{ errors.name }</small>
//          </div>
//      )}
//  </div>

//  <div className="form-group file2">
//      <label htmlFor='system'>Sistema</label>
//      <input type="text"
//          className={ `input__light-${errors.system && touched.system ? 'warning' : 'success'}` }
//          placeholder="Ingrese el nombre del Sistema"
//          value={ values.system }
//          onBlur={ handleBlur }
//          onChange={ handleChange }
//          name="system"
//      />
//      { errors.system && touched.system && (
//          <div className='text-red'>
//              <small className="text-red-600">{ errors.system }</small>
//          </div>
//      )}
//  </div>

//  <div className="form-group file3">
//      <label htmlFor='description'>Descripción</label>
//      <input type="text"
//          className={ `input__light-${errors.description && touched.description ? 'warning' : 'success'}` }
//          placeholder="Ingrese una descripción"
//          value={ values.description }
//          onBlur={ handleBlur }
//          onChange={ handleChange }
//          name="description"
//      />
//      { errors.description && touched.description && (
//          <div className='text-red'>
//              <small className="text-red-600">{ errors.description }</small>
//          </div>
//      )}
//  </div>
//  <div className="form-group file4">
//      <label htmlFor='file'>Archivo</label>
//      <input 
//          id='file'
//          type="file" 
//          name="file" 
//          onChange={(event) => {setFieldValue("file", event.currentTarget.files[0])
//          }}
//      />
//  </div>
 
//  <div className="form-group file5">
//      <button type="submit" className="btn">Nueva carga</button>
//  </div> 
// </form>
export default FormFileInformation;
