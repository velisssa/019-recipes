import React from 'react';
import './BreadCrumbs.scss'
import {Link, useLocation} from "react-router-dom";

const BreadCrumbs = ({category, name}) => {
  const location = useLocation();
  let data = location.pathname.split('/').slice(1);

  data = data.reduce((sum, elem) => {
    if(elem !== 'areas' && elem !== 'categories'){
      const res = elem.replaceAll('%20', ' ').replaceAll('Unknown', 'Others');
      sum.push(res)
    }
    return sum
  }, [])

  return (
    <section className="breadcrumbs">
      {!category
        ? <ul className="breadcrumbs__list">
          <li className="breadcrumbs__first-item">
            <Link className="breadcrumbs__first-item-link hoverLink" to='/'>Home</Link>
          </li>
          {data.map((item, i) =>
            <li className="breadcrumbs__item" key={i}>
              {i < (data.length - 1) ?
                <Link className="breadcrumbs__item-link hoverLink" to={`/${item}`}>
                  {(item.charAt(0).toUpperCase() + item.slice(1)).replace('-', ' ')}
                </Link>
                : data.length === 2
                  ? <span className="breadcrumbs__item-link">
                {name}
              </span>
                  : <span className="breadcrumbs__item-link">
                  {(item.charAt(0).toUpperCase() + item.slice(1)).replace(/-/g, ' ')}
              </span>
              }
            </li>)
          }
        </ul>


        : <ul className="breadcrumbs__list">
          <li className="breadcrumbs__first-item">
            <Link className="breadcrumbs__first-item-link hoverLink" to='/'>Home</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__first-item-link hoverLink" to={`/categories/${category}`}> {category} </Link>
          </li>
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__item-link">{name}</span>
          </li>
        </ul>
      }
    </section>
  )
}


export default BreadCrumbs;