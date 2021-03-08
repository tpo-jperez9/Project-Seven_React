import React from 'react';
import { NavLink } from 'react-router-dom';

// This provides navs for the default searches on the home page//
const Navs = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/godzilla">Godzilla</NavLink>
        </li>
        <li>
          <NavLink to="/helicopters">Helicopters</NavLink>
        </li>
        <li>
          <NavLink to="/airplanes">Airplanes</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navs;