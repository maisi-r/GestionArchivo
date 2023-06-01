import React from 'react'
import "./form.scss"
import { useFormik } from 'formik';
import * as Yup from "yup"; 
import { useAddFileMutation } from '../../store/apis/fileApi';
import { useForm } from "react-hook-form";
import { useGetSystemsQuery } from '../../store/apis/systemApi';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import 'sweetalert2/dist/sweetalert2.css';




const FormFile = () =>  {
    
    
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
                        navigate(`/`);
                    }
                })

    };



    return (

        
        
        <div className='container'>
            <h1>Nueva Carga</h1>
            <div className="base-container">
                <form onSubmit={handleSubmit(onSubmit)} className="formfile">
                    <div className="form-group file1">
                        <label htmlFor='name'>Nombre</label> 
                        <input {...register("name")} />
                    </div>

                    {/* <div className="form-group file2">
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
                    </div> */}

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

                    <div className="form-group file9">         
                    <button onClick={() => navigate(-1)} className="btn">Cancelar</button>
                    </div>
                </form>
            </div>   
        </div>
    )
  }
export default FormFile;
