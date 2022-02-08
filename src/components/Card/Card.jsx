import React, {useState, useContext} from 'react';
import {PetsContext} from "../Pets//Pets";
import heartFilled from '../../svgs/heartFilled.svg';
import heartOutlined from '../../svgs/heartOutlined.svg';
import './Card.css';

const Card = ({ name, phone, email, image, favoured, index }) => {
  const {cats, setCats} = useContext(PetsContext);
    const [isFavoured, setIsFavoured] = useState(favoured);

    const toggleFavoured = () => {
        updateFavourite(index, !isFavoured)
        setIsFavoured(!isFavoured);
    }

    const updateFavourite = (index, favoured) => {
      const updatedCats = [...cats];
      updatedCats[index].favoured = favoured;
      setCats(updatedCats);
    }

  return (
    <article className="card">
      <div className="card-header">
        <img src={image.url} alt={image.alt} className="card-img" />
        <button className="heart" onClick={toggleFavoured}>
          {isFavoured ? (
            <img src={heartFilled} alt="filled heart" />
          ) : (
            <img src={heartOutlined} alt="oulined heart" />
          )}
        </button>
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  );
};

export default Card;
