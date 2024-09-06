import { useState } from "react";
import styles from "../styles/Register.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import JustLogo from "../assets/just-logo.jpg";
import ImageForm from "../components/ImageForm";
import { validateRegister } from "../helpers/validateRegister";

function SignUp() {
   // Hook para navegar
   const navigate = useNavigate();

   // Estado para manejar los datos del usuario
   const [userData, setUserData] = useState({
      name: "",
      email: "",
      birthdate: "",
      nDni: null,
      username: "",
      password: ""
   });

   // crear evento para el manejo de error
   const [ errors, setErrors ] = useState({
      name: "",
      email: "",
      birthdate: "",
      nDni: "",
      username: "",
      password: ""
   });

   // Función para manejar cambios en los inputs
   const handleOnChange = (event) => {
      const { name, value } = event.target;
      setUserData({
         ...userData,
         [name]: name === "nDni" ? Number(value) : value
      });
      setErrors(validateRegister({
         ...userData,
         [name]: name === "nDni" ? Number(value): value
      }))
   };

   // Función para manejar el submit del formulario
   const handleOnSubmit = async (event) => {
      event.preventDefault();
      
      try {
         await axios.post("http://localhost:3000/users/register", userData);
         alert("Successful registration");

         // Redirigir al usuario a la página de login
         navigate("/login");

      } catch (error) {
         console.error("Error durante el registro:", error);
         if (error instanceof Error) {
            alert("An error occurred during registration. Please try again.");
         }
      }

      // Limpiar el formulario
      setUserData({
         name: "",
         email: "",
         birthdate: "",
         nDni: null,
         username: "",
         password: ""
      });
   };

   return (
      <main>
         <div className={styles.logginUser}>
            <figure className={styles.logoMain}>
               <Link to="/" >
                  <img src={JustLogo} alt="logo" className={styles.logo} />
               </Link>
            </figure>
            <section className={styles.loggin}>
               <h3>Create your D-rents account</h3>
               <div className={styles.needAccount}>
                  <p>Already have a D-rents account</p>
                  <Link to="/login"> Log in </Link>
               </div>

               <form onSubmit={handleOnSubmit} action="" className={styles.loginForm}>
                  <input 
                  onChange={handleOnChange} 
                  name="name" 
                  type="text" 
                  placeholder="Name" 
                  id="name" 
                  value={userData.name}
                  className={styles.name} />
                  { userData.name && errors.name && (
                     <p className={styles.error} > {errors.name} </p>
                  )}

                  <input 
                  onChange={handleOnChange} 
                  name="email" 
                  value={userData.email}
                  type="email" 
                  placeholder="Email" 
                  id="email" 
                  className={styles.email} />
                  { userData.email && errors.email && (
                     <p className={styles.error} > { errors.email } </p>
                  )}

                  <input 
                  onChange={handleOnChange} 
                  name="birthdate" 
                  value={userData.birthdate}
                  type="text" 
                  placeholder="Birthdate: yyyy-mm-dd" 
                  id="birthdate" 
                  className={styles.birthdate} />
                  { userData.birthdate && errors.birthdate && (
                     <p className={styles.error} > {errors.birthdate} </p>
                  )}
                  
                  <input 
                  onChange={handleOnChange} 
                  name="nDni" 
                  value={userData.nDni}
                  type="number" 
                  placeholder="Document ID" 
                  id="nDni" 
                  className={styles.nDni} />
                  { userData.nDni && errors.nDni && (
                     <p className={styles.error} > {errors.nDni} </p>
                  )}

                  <input 
                  onChange={handleOnChange} 
                  name="username" 
                  value={userData.username}
                  type="text" 
                  placeholder="Username" 
                  id="username" 
                  className={styles.username} />
                  { userData.username && errors.username && (
                     <p className={styles.error} > {errors.username} </p>
                  )}

                  <input 
                  onChange={handleOnChange} 
                  name="password" 
                  value={userData.password}
                  type="password" 
                  placeholder="Password" 
                  id="password" 
                  className={styles.password} />
                  { userData.password && errors.password && (
                     <p className={styles.error}> {errors.password} </p>
                  )}

                  <button 
                  className={styles.button} 
                  type="submit"
                  disabled={
                     errors.name || 
                     errors.email || 
                     errors.birthdate || 
                     errors.nDni ||
                     errors.username ||
                     errors.password
                  }
                  >Sign up</button>
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
         <div className={styles.coverPicture}>
            <ImageForm />
         </div>
      </main>
   );
};

export default SignUp;
