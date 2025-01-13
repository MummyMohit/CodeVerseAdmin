import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate()
  const handleOpen = () => {
    setDropdown(!dropdown);
    console.log("Toggle dropdown");
  };

  const handleLogout = () => {
    localStorage.removeItem('mohitToken')
    navigate('/')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <div className="dropdown ms-auto">
            <span className="navbar-text">
              <CgProfile
                style={{ fontSize: '2rem', cursor: 'pointer' }}
                onClick={handleOpen}
              />
            </span>
            <div
              className={`dropdown-menu ${dropdown ? "show" : ""}`}
              aria-labelledby="dropdownMenuButton"
            >
              <Link className="dropdown-item" onClick={handleLogout}>Logout</Link>
              <Link  to='/layout/profile' className="dropdown-item">User Profile</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
