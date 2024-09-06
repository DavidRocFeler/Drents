import React, { useEffect } from 'react';
import '../styles/FooterForms.css';  // Asegúrate de tener los estilos correctos
import logoFondoblack from '../assets/logo-fondoblack.jpg';
import logoTypografia from '../assets/logo-typografia.png';
import logoFacebook from '../assets/logo-facebook.png';
import logoInstagram from '../assets/logo-instagram.png';
import logoLinkending from '../assets/logo-linkending.png';
import logoX from '../assets/logo-x.png';
import { updateSubdiensten } from '../helpers/FooterForms';  // Importa la función desde index.js

const FormsAndFooter = () => {
  useEffect(() => {
    const dienstenSelect = document.getElementById("diensten-select");
    const subdienstenSelect = document.getElementById("subdiensten-select");

    if (dienstenSelect && subdienstenSelect) {
      console.log("Found diensten-select and subdiensten-select");
      dienstenSelect.addEventListener("change", function () {
        const selectedDiensten = dienstenSelect.value;
        console.log("dienstenSelect changed to:", selectedDiensten);
        updateSubdiensten(selectedDiensten, subdienstenSelect);
      });
    } else {
      console.error("Select elements not found in the DOM");
    }
  }, []);

  return (
    <footer>
      <section className="formulario">
        <div className="formulario-contenedor">
          <div className="logos">
            <img src={logoFondoblack} alt="" className="logo-start4" />
            <img src={logoTypografia} alt="" className="logo-typographic" />
          </div>

          <form action="">
            <div className="pieza1">
              <div className='leftForms'>
                <div className="pieza1-1">
                  <input type="text" placeholder="Name" className="input-field"/>
                </div>
                <div className="pieza1-2">
                  <input type="number" placeholder="Phone number" className="input-field"/>
                </div>
                <div className="pieza1-3">
                  <select id="diensten-select" className="input-field" defaultValue="">
                    <option value="" disabled>Are you a homeowner or tenant?</option>
                    <option value="webontwikkeling">Webontwikkeling en Maatwerk Applicaties</option>
                    <option value="grafisch">Grafische Ontwerpdiensten</option>
                    <option value="community">Community Manager Diensten</option>
                    <option value="seo">SEO en SEM Diensten</option>
                    <option value="database">Database en Data-analyseservices</option>
                  </select>
                </div>
              </div>
              <div className='rightForms'>
                <div className="pieza1-4">
                  <input type="text" placeholder="Last name" className="input-field"/>
                </div>
                <div className="pieza1-5">
                  <input type="email" placeholder="E-mail" className="input-field"/>
                </div>
                <div className="pieza1-6">
                  <select id="subdiensten-select" className="input-field" defaultValue="">
                    <option value="" disabled>Kies een subdienst</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="pieza2">
              <div className="pieza2-1">
                <textarea placeholder="Your message" className="input-field-youtext"></textarea>
              </div>
              <div className="pieza2-2">
                <button type="submit" className="input-field-submit">Submit</button >
              </div>
            </div>
          </form>
        </div>
      </section>

      <hr className="hr2" />

      <div className="footer-last">
        <address>
          <p className="E-mail-p">
            <img src="../../assets/logo-mail.PNG" alt="" className="E-mail" /> 
            E-mail: support@d_rents.io
          </p>
          <p className="mobiele-p">
            <img src="../../assets/logo-phono.PNG" alt="" className="mobiele" /> 
            Phone: +34 6867278
          </p>
        </address>
        <nav className="browse1">
          <a href="">Terms & Conditions</a>
          <a href="">Cookies Policy</a>
          <a href="">Privacy Policy</a>
        </nav>
        <nav className="browse2">
          <a href="">Tenant Guide</a>
          <a href="">Homeowner Guide</a>
          <a href="">Support</a>
        </nav>
        <nav className="browse3">
          <strong>FOLLOW</strong>
          <figure className="logos-sociales">
            <img src={logoFacebook} alt="" />
            <img src={logoInstagram} alt="" />
            <img src={logoLinkending} alt="" />
            <img src={logoX} alt="" />
          </figure>
        </nav>
      </div>
    </footer>
  );
};

export default FormsAndFooter;
