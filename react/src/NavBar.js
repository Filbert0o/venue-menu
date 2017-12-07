import React from 'react';
import { Link } from 'react-router';
import BackButton from "./components/BackButton";
import SearchBar from './components/SearchBar';

const NavBar = props =>{
  return(
    <div>
      <div id='header'>
        <div id='billboard'>
          <h2>Venue Menu</h2>
        </div>
        <div id='nav-bar'>
          <div id='search-bar' className="ten columns">
            <SearchBar />
          </div>
          <Link to='#'><button className='nav-button'>Sign In</button></Link>&nbsp;
          <Link to='#'><button className='nav-button'>Sign Up</button></Link>&nbsp;
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default NavBar;
