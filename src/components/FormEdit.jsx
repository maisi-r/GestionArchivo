import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup"; 
import { useAddFileMutation, useGetFileQuery, useGetFilesQuery, useUpdateFileMutation } from '../store/apis/fileApi/';
 import { useGetAdditionalInformationFileQuery, useAddAditionaInformationFileMutation, useUpdateAditionaInformationFileMutation, useDeleteAditionaInformationFileMutation } from '../store/apis/additionalInformationFileApi/';
import { useParams } from 'react-router-dom';
import { parse, isDate } from "date-fns";
import DatePicker from "react-datepicker";
import { format } from "date-fns";


import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import "react-datepicker/dist/react-datepicker.css";
import {  useSelector } from 'react-redux';

const FormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetFileQuery(id);
  const [updateEdit] = useUpdateAditionaInformationFileMutation();
  const additionalInformationId = data?.file?.additionalInformation?._id;
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    if (data) {
      setStartDate(new Date(data.date));
    }
  }, [data]);

  console.log(additionalInformationId);

  const updateFileMutation = useUpdateFileMutation();

  function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "yyyy-MM-dd", new Date());
  
    return parsedDate;
  }

  

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    number: Yup.string().required('El número es obligatorio'),
    correlative: Yup.string().required('El correlativo es obligatorio'),
    year: Yup.string().required('El año es obligatorio'),
    body: Yup.string().required('El cuerpo es obligatorio'),
    initiator: Yup.string().required('El iniciador es obligatorio'),
    issue: Yup.string().required('El asunto es obligatorio'),
  });

  console.log(data)

  const initialValues = {
    name: data?.file?.name || '',
    description: data?.file?.description || '',
    number: data?.file?.additionalInformation?.number || '',
    correlative: data?.file?.additionalInformation?.correlative || '',
    year: data?.file?.additionalInformation?.year || '',
    body: data?.file?.additionalInformation?.body || '',
    initiator: data?.file?.additionalInformation?.initiator || '',
    issue: data?.file?.additionalInformation?.issue || '',
  };

  const onSubmit = async (values) => {
    const additionalInformation = {
      _id: additionalInformationId,
      number: parseInt(values.number), // Convierte a número
      correlative: parseInt(values.correlative), // Convierte a número
      year: values.year.toString(), // Convierte a cadena de texto
      date: values.date,
      body: parseInt(values.body), // Convierte a número
      initiator: values.initiator,
      issue: values.issue,
    };

    const updatedFile = {
      name: values.name,
      system: values.system,
      description: values.description,
      additionalInformation: additionalInformation,
    };
    

    try {
      console.log(values);
      const responseedit = await updateEdit({ id: additionalInformationId, data: updatedFile }).unwrap();
      Swal.fire({ title: "Exito", text: "Archivo editado correctamente", icon: "success", timer: 3500 });
      console.log(responseedit);
      navigate(`/`); // Corrección: cambia "history(`/archivos/`)" a "history.push(`/archivos/`)"
    } catch (error) {
      console.log(error);
    }
  };



  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <>
      <div className="container">
        <div className="form-container">
          <h3>Editar Archivo</h3>
          <form onSubmit={handleSubmit}>
            <div className='form-group item1'>
              <label htmlFor="name">Nombre del documento</label>
              <input
                type="text"
                className={`input__light-${errors.name && touched.name ? 'warning' : 'success'}`}
                placeholder="Ingrese el nombre del documento"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                name="name"
              />
              {errors.name && touched.name && (
                <div className='text-red'>
                  <small className="text-red-600">{errors.name}</small>
                </div>
              )}
            </div>

            <div className='form-group item3'>
              <label htmlFor="description">Descripción</label>
              <textarea
                className={`textarea__light-${errors.description && touched.description ? 'warning' : 'success'}`}
                placeholder="Ingrese la descripción"
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
                name="description"
              ></textarea>
              {errors.description && touched.description && (
                <div className='text-red'>
                  <small className="text-red-600">{errors.description}</small>
                </div>
              )}
            </div>

            <div className='form-group item1'>
              <label htmlFor="number">Número</label>
              <input
                type="text"
                className={`input__light-${errors.number && touched.number ? 'warning' : 'success'}`}
                placeholder="Ingrese el número"
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
              <label htmlFor="correlative">Correlativo</label>
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

            <div className='form-group item3'>
              <label htmlFor="year">Año</label>
              <input
                type="text"
                className={`input__light-${errors.year && touched.year ? 'warning' : 'success'}`}
                placeholder="Ingrese el año"
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

            <div className='form-group item3'>
              <label htmlFor="date">Fecha</label>
              <DatePicker
                selected={values.date}
                onChange={(value) => formik.setFieldValue('date', value)}
                onBlur={handleBlur}
                className={`input__light-${errors.date && touched.date ? 'warning' : 'success'}`}
                dateFormat="yyyy-MM-dd"
                name="date"
              />
              {errors.date && touched.date && (
                <div className='text-red'>
                  <small className="text-red-600">{errors.date}</small>
                </div>
              )}
            </div>

            <div className='form-group item3'>
              <label htmlFor="body">Cuerpo</label>
              <textarea
                className={`textarea__light-${errors.body && touched.body ? 'warning' : 'success'}`}
                placeholder="Ingrese el cuerpo"
                value={values.body}
                onBlur={handleBlur}
                onChange={handleChange}
                name="body"
              ></textarea>
              {errors.body && touched.body && (
                <div className='text-red'>
                  <small className="text-red-600">{errors.body}</small>
                </div>
              )}
            </div>

            <div className='form-group item3'>
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

            <div className='form-group item3'>
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

            <button type="submit" className="button__light-primary">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormEdit;
