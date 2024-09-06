import "../styles/CardsProperty.css"

const CardsMainProperty = (props) => {
    const { price, address, details, image } = props.cardProperty;
    return(
        <>
          <div className="property-card" >
            <img src={image} alt={address} />
            <div className="property-info" >
              <h3>{price}  </h3>
              <p>{address}</p>
              <p>{details}</p>
            </div>
          </div>
        </>
    )
};

export default CardsMainProperty;