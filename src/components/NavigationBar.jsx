import React from 'react';
import logo from '../YourCareLogo.svg';
import Strings from '../Strings';

const NavBar = () => {
  const navStyle = {
    display: 'flex',
      justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#ACA9BB',
    color: '#5F5C6D',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const linkStyle = {
    color: '#5F5C6D',
    textDecoration: 'none'
  };

  return (
    <nav style={navStyle}>
      <div>
              <img src={logo} alt="YourCare" style={{height: '50px'}} />
      </div>
          <div style={{display:'flex', alignItems:'center'}}>
        <a href="#home" style={{ ...linkStyle, marginRight: '10px' }}>{Strings.home}</a>
        <a href="#about" style={linkStyle}>{Strings.aboutUs}</a>
      </div>
    </nav>
  );
};

export default NavBar;
