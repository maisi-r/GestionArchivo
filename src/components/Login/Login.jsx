import React from "react";
import marcalogo from "../../assets/marcalogo.png"
import "./login.scss"

const Login = ()=>{
        return( 
        <div className="base-container">
            <div className="container">
            
            
            
            <div className="content">
            <div className="header">Login</div>
            <div className="image">
                <img src={marcalogo}/>
            </div>
            <div className="form">
                <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input type="text" name="username" placeholder="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" placeholder="password" />
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">Login</button>
            </div>
            </div>
            
            
        </div>
        
        </div>
)

}

export default Login;
