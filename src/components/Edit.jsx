


import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup"; 
import { useAddFileMutation, useGetFileQuery, useGetFilesQuery, useUpdateFileMutation } from '../store/apis/fileApi/';
 import { useGetAdditionalInformationFileQuery, useAddAditionaInformationFileMutation, useUpdateAditionaInformationFileMutation, useDeleteAditionaInformationFileMutation } from '../store/apis/additionalInformationFileApi/';
import { useParams } from 'react-router-dom';
import { parse, isDate } from "date-fns";
import DatePicker from "react-datepicker";

import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import "react-datepicker/dist/react-datepicker.css";
import {  useSelector } from 'react-redux';

const FormEdit = () => {

  const { id } = useParams()


  let dataEdit = "";
  const { data: initialValues, isLoadingadicional } = useGetAdditionalInformationFileQuery(id);
  console.log(initialValues)
  dataEdit = !isLoadingadicional ? initialValues?.additionalInformationFile : "";
  const [updateEdit] = useUpdateAditionaInformationFileMutation();
  const [addEdit] = useAddFileMutation();
  const [startDate, setStartDate] = useState(null);
  const required = "El campo es requerido";
  const navigate = useNavigate();
console.log(dataEdit);
  useEffect(() => {
    if (initialValues) {
      setStartDate(new Date(initialValues.date));
    }
  }, [initialValues]);

  function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "yyyy-MM-dd", new Date());
  
    return parsedDate;
  }

  const formik = useFormik({
    initialValues: {
      number: "",
      correlative: "",
      body: "",
      year: "",
      date: Date.now(),
      initiator: "",
      issue: ""
    },

    validationSchema: Yup.object({
      number: Yup.number().required(required),
      correlative: Yup.number().required(required),
      year: Yup.number().required(required),
      body: Yup.number().required(required),
      date: Yup.date().nullable().transform(parseDateString).typeError("Al editar debe seleccionar nuevamente la fecha"),   
      initiator: Yup.string().required(required),
      issue: Yup.string().required(required),
    }),

    onSubmit: async (values) => {
      try {
        console.log(values);
        const responseedit = await updateEdit({ id: id, data: values }).unwrap();
        Swal.fire({ title: "Exito", text: "Archivo editado correctamente", icon: "success", timer: 3500 });
        console.log(responseedit);
        navigate(`/archivos/`);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik;

 

  formik.initialValues.number = dataEdit?.number|| "";
  formik.initialValues.correlative = dataEdit?.correlative || "";
  formik.initialValues.body = dataEdit?.body || "";
  formik.initialValues.year = dataEdit?.year|| "";

  
  formik.initialValues.initiator = dataEdit?.initiator || "";
  formik.initialValues.issue = dataEdit?.issue || "";

  
  // if (isLoading) {
  //   return <div>Cargando...</div>;
  // }

  return (
    <>
      <h1>Editar Carga Adicional</h1> 
      <div className='container'>
      <div className="base-container">
      
        <form onSubmit={handleSubmit} className="form">
          <div className='form-group item1'>
            <label htmlFor="number">Expediente N°</label>
            <input
              type="text"
              className={`input__light-${errors.number && touched.number ? 'warning' : 'success'}`}
              placeholder="Ingrese el número del expediente"
              value={values.number}
              onBlur={handleBlur}
              onChange={handleChange}
              name="number"
            />
            {errors.number && touched.number && (
              <div className='text-red'>
                <small className="text-red-600">{errors.number}</small>
              </div>
            )}
          </div>

          <div className='form-group item2'>
            <label htmlFor="name">N° Correlativo</label>
            <input
              type="text"
              className={`input__light-${errors.correlative && touched.correlative ? 'warning' : 'success'}`}
              placeholder="Ingrese el correlativo"
              value={values.correlative}
              onBlur={handleBlur}
              onChange={handleChange}
              name="correlative"
            />
            {errors.correlative && touched.correlative && (
              <div className='text-red'>
                <small className="text-red-600">{errors.correlative}</small>
              </div>
            )}
          </div>

          <div className='form-group item4'>
            <label htmlFor="body">Cuerpo</label>
            <input
              type="text"
              className={`input__light-${errors.body && touched.body ? 'warning' : 'success'}`}
              placeholder="Ingrese el cuerpo"
              value={values.body}
              onBlur={handleBlur}
              onChange={handleChange}
              name="body"
            />
            {errors.body && touched.body && (
              <div className='text-red'>
                <small className="text-red-600">{errors.body}</small>
              </div>
            )}
          </div>

          <div className='form-group item3'>
            <label htmlFor="year">Año</label>
            <input
              type="text"
              className={`input__light-${errors.year && touched.year ? 'warning' : 'success'}`}
              placeholder="Ingrese el nombre"
              value={values.year}
              onBlur={handleBlur}
              onChange={handleChange}
              name="year"
            />
            {errors.year && touched.year && (
              <div className='text-red'>
                <small className="text-red-600">{errors.year}</small>
              </div>
            )}
          </div>

          <div className='form-group item7'>
            <label htmlFor="date">Fecha</label>
            <DatePicker
              className={`input__light-${errors.date && touched.date ? 'warning' : 'success'}`}
              label="Fecha de inicio"
              selected={values.date}
              id="date"
              name="date"
              value={values.date}
              onChange={(value) => { formik.setFieldValue('date', value) }}
            />
            {errors.date && touched.date && (<div className='text-red'><small className="text-red-600">{errors.date}</small></div>)}
            {errors.date && touched.date && (
              <div className='text-red'>
                <small className="text-red-600">{errors.date}</small>
              </div>
            )}
          </div>

          <div className='form-group item5'>
            <label htmlFor="initiator">Iniciador</label>
            <input
              type="text"
              className={`input__light-${errors.initiator && touched.initiator ? 'warning' : 'success'}`}
              placeholder="Ingrese el iniciador"
              value={values.initiator}
              onBlur={handleBlur}
              onChange={handleChange}
              name="initiator"
            />
            {errors.initiator && touched.initiator && (
              <div className='text-red'>
                <small className="text-red-600">{errors.initiator}</small>
              </div>
            )}
          </div>

          <div className='form-group item6'>
            <label htmlFor="issue">Asunto</label>
            <input
              type="text"
              className={`input__light-${errors.issue && touched.issue ? 'warning' : 'success'}`}
              placeholder="Ingrese el asunto"
              value={values.issue}
              onBlur={handleBlur}
              onChange={handleChange}
              name="issue"
            />
            {errors.issue && touched.issue && (
              <div className='text-red'>
                <small className="text-red-600">{errors.issue}</small>
              </div>
            )}
          </div>

          <div className='form-group'>
            <button type="submit" className="button primary">{"Guardar"}</button>
            <button type="button" className="button secondary" onClick={() => navigate(`/archivos/`)}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
      </>
  );
}

export default FormEdit;

