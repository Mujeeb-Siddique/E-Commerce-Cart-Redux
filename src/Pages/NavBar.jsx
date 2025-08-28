import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">CartApp</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex gap-4 me-5">
              
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="/">
                  <FaHome size={18} /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="/products">
                  <GiShoppingBag size={18} /> Products
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="/cart">
                  <FaShoppingCart size={18} /> Cart
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar
