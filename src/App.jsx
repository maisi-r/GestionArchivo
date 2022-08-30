import React from "react";
import Login from "./components/Login/Login";
import FileTable from "./components/FileTable/FileTable";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Routes, Route} from "react-router-dom";
import FormFile from "./components/FormFileInformation/FormFileInformation";
import FormFileInformation from "./components/FormFile/FormFile";

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>} />
        
        <Route path="/archivos" element={<FileTable/>} />

        <Route path="/informacion-adicional" element={<FormFileInformation/>} />

        <Route path="/carga" element={<FormFile/>} /> 



        
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App