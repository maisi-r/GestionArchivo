import React from "react";
import Login from "./components/Login/Login";
import FileTable from "./components/FileTable/FileTable";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Routes, Route} from "react-router-dom";
import FormFile from "./components/FormFile/FormFile";
import FormFileInformation from "./components/FormFileInformation/FormFileInformation";

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>} />
        
        <Route path="/archivos" element={<FileTable/>} />

        <Route path="/informacion-adicional" element={<FormFile/>} />

        <Route path="/carga" element={<FormFileInformation/>} />



        
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App