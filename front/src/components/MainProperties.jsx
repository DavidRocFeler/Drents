import React, { useState, useEffect } from 'react';
import properties from '../helpers/MainProperties'; // Importar el archivo de datos
import '../styles/MainProperties.css';
import CardsMainProperty from './MainPropertyCards';

const MainProperties = () => {

  const propertiesPerPage = 6; // Definimos cuántas propiedades queremos mostrar por página
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  
  // Inicializa el estado con las primeras 6 propiedades
  const [currentPage, setCurrentPage] = useState(1);
  const [cardProperty, setCardProperty] = useState(properties.slice(0, propertiesPerPage));

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      const startIndex = (nextPage - 1) * propertiesPerPage;
      setCardProperty(properties.slice(startIndex, startIndex + propertiesPerPage));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      const startIndex = (previousPage - 1) * propertiesPerPage;
      setCardProperty(properties.slice(startIndex, startIndex + propertiesPerPage));
    }
  };



  return (
    <section className="properties">
      <article id="cardsProperties" >
        {
          cardProperty.map((cardProperty) => (
            <CardsMainProperty 
            key={cardProperty.id}
            cardProperty={cardProperty}
            />
          ))
        }
      </article>
      <button disabled={currentPage === 1} onClick={handlePreviousPage} className="nav-arrow left-arrow">‹</button>
      <button disabled={currentPage === totalPages} onClick={handleNextPage} className="nav-arrow right-arrow">›</button>
      <p className='Pag'> {`${currentPage}/${totalPages}`} </p>
    </section>
  );
};

export default MainProperties;
