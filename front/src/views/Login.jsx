import { useState } from "react";
import styles from "../styles/Login.module.css";
import { validateCredentials } from "../helpers/validateCredentials.js";
import { Link, useNavigate } from "react-router-dom";
import JustLogo from "../assets/just-logo.jpg"
import ImageForm from "../components/ImageForm.jsx";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice.js";
import axios from "axios";

// 1 crear el primer evento para los inputos inicien vacios
function Login() {
  const [ userData,  setUserData ] = useState({
    username: "",
    password: ""
  })
  console.log(userData)

  // 4 crear un nuevo evento que capture los errores 
  const [ errors, setErrors ] = useState({
    username: "",
    password: "",
  })

  // 3 crear una funcion que permita capturar los datos del input uno por uno y setee el evento
  function handletOnchange (event) {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    })
    // 5 setear los errores trayendo un archivo de helpers o utils 
    setErrors(validateCredentials({
      ...userData,
      [name]: value
    }))
  };

  // traer hoocks esenciales 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // 2 crear una funcion que capture los input y envie un mensaje de alerta 
  function handleOnSubmit(event) {
    event.preventDefault();
    // enviar el post ala api de login
    axios.post("http://localhost:3000/users/login", {
      username: userData.username,
      password: userData.password,
    })
    .then(response => {
      if( response.data.login ) {
        const user = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          birthdate: response.data.user.birthdate,
          nDni: response.data.user.nDni
        };

        // despacha la accion para actualisar el estado global 
        dispatch(loginSuccess(user));

        // guardar la informacion de usuario en local storage
        localStorage.setItem("user", JSON.stringify(user));
        
        // resetea los campos del login
        setUserData({
          username: "",
          password: "",
        })

        alert(`Logged in as: ${userData.username}`);

        // redirgir al usuario ala pagina home atraves del hook y el path
        navigate("/");
      } else {
        alert(`Login failed, credentials incorrect or not found`)
      }
    })
    .catch(error => {
      console.log(`Error durante la autentificacion`, error);
      alert(`Login failed, credentials incorrect or not found`)
    });
    
 }
 
  return (
    <main>
      <div className={styles.logginUser}>
        <figure className={styles.logoMain}>
          <Link to="/" >
            <img src={JustLogo} alt="logo" className={styles.logo} />
          </Link>
        </figure>
        <section className={styles.loggin}>
          <h3>Login To D-rents</h3>
          <div className={styles.needAccount}>
            <p>Need a D-rents account?</p>
            <Link to="/signup" > Sign up </Link>
          </div>
          <div className={styles.optionLogin}>
            <p className={styles.walletLoggin}>Wallet Login</p>
            <p className={styles.QrLogin}>QR Code Login</p>
          </div>
          <form 
          className={styles.loginForm}
          onSubmit={handleOnSubmit}
          >
            <input 
            type="text" 
            placeholder="User" 
            id="user" 
            className={styles.user} 
            name="username"
            value={userData.username}
            onChange={handletOnchange}
            />
            {userData.username && errors.username && (
              <p className={styles.errorUsername}>{errors.username}</p>
            )}

            <input 
            type="password" 
            placeholder="Password" 
            id="password" 
            className={styles.password} 
            name="password"
            value={userData.password}
            onChange={handletOnchange}
            />
            {userData.password && errors.password && (
              <p className={styles.errorPassword}>{errors.password}</p>
            )}

            <a href="">Forgot your password</a>
            <button 
            type="submit" 
            className={styles.button}
            disabled={errors.username || errors.password }
            >Log in</button>
          </form>
        </section>
        <hr />
        <div className={styles.footerLogin}>
          <p>All rights reserved | 2024 D-rents | Developed by Start4 </p>
          <aside>
            <a href="">Privacy</a>
            <a href="">Terms & Conditions</a>
            <a href="">Support</a>
          </aside>
        </div>
      </div>
      <div className={styles.coverPicture} >
      <ImageForm/>
      </div>
    </main>
  );
}

export default Login;
