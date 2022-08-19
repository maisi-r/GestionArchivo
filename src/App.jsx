import React from "react";
import Login from "./components/Login/Login";
import "./app.scss"
import FileTable from "./components/FileTable/FileTable";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <div>
      <Login/>
      <Header />
      <FileTable />
    </div>
  )
}

export default App