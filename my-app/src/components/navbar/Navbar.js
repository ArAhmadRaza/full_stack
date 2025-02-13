import { useState } from "react";
import { Menu, X } from "lucide-react";
import NewPost from "../newPost/NewPost";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">AR Ahmad</div>

        {/* Desktop Menu */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["Home", "Products", "About", "Contact"].map((name) => (
            <li key={name}>
              <a
                href={`#${name.toLowerCase()}`}
                className="nav-item"
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </a>
              
            </li>
          ))}
        </ul>
        <NewPost />
        {/* Mobile Menu Toggle */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <style jsx>{`
        /* Navbar Styles */
        .navbar {
          position: fixed;
          top: 0;
          width: 96%;
          padding: 1rem 2rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          z-index: 1000;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: auto;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          color: #67e6dc;
          cursor: pointer;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }

        .nav-item {
          text-decoration: none;
          font-size: 1rem;
          color: #fff;
          font-weight: 500;
          padding: 0.5rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-item::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -4px;
          width: 0;
          height: 2px;
          background: #67e6dc;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-item:hover::after {
          width: 100%;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #fff;
        }

        /* Mobile Menu */
        @media (max-width: 768px) {
          .nav-links {
            position: absolute;
            top: 60px;
            right: 10px;
            width: 220px;
            background: rgba(0, 0, 0, 0.95);
            border-radius: 8px;
            flex-direction: column;
            align-items: center;
            padding: 1rem 0;
            display: none;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease-in-out;
          }

          .nav-links.open {
            display: flex;
            opacity: 1;
            transform: translateY(0);
          }

          .nav-item {
            padding: 1rem;
            width: 100%;
            text-align: center;
          }

          .menu-toggle {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
