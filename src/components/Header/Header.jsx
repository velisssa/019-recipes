import React from 'react';
import {NavLink} from "react-router-dom";
//_____________________________________________________________________________________
import './Header.scss'
import logoIcon from '../../assets/img/logo.png'
//_____________________________________________________________________________________

const Header = () => {
  return (
    <header className='header'>

      <div className='header__container container'>
        <NavLink className='header__logo' to='/'>
          <img src={logoIcon} title='logo' alt='logo'/>
        </NavLink>

        <nav>
          <NavLink className='hoverLink' to='/alphabet'>Alphabet</NavLink>
          {/*<NavLink className='hoverLink' to='/search'>Search</NavLink>*/}
          <NavLink className='hoverLink' to='/ingredient'>Ingredient</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;