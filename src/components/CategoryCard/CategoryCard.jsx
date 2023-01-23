import React from 'react';
import {Link} from "react-router-dom";
//_____________________________________________________________________________________
import './CategoryCard.scss'
//_____________________________________________________________________________________

const CategoryCard = ({typeCategory, recipes}) => {

  return (
    <Link
      className='categoryCard'
      to={`/${typeCategory}/${recipes?.strCategory ? recipes?.strCategory : recipes?.strArea}`}
    >

      {typeCategory === 'category'
        ? <div className='categoryCard__image'>
          <img
            src={recipes?.strCategoryThumb}
            alt={recipes?.strCategory}
            title={recipes?.strCategory}
          />
        </div>

        : <div className='categoryCard__image'/>
      }

      <div className='categoryCard__info'>
        <h2 className='categoryCard__title'>
          {recipes?.strCategory
            ? recipes?.strCategory
            : recipes?.strArea
          }
        </h2>
      </div>
    </Link>
  );
};

export default CategoryCard;