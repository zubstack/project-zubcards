import { FaUserLarge } from "react-icons/fa6";
import "./Nav.scss";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [openToggle, setOpenToggle] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (menuRef.current) {
        if (!menuRef.current.contains(e.target as Node)) {
          setOpenToggle(false);
        }
      }
    });
  }, []);
  return (
    <nav>
      <ul className="menu">
        <li id="logo">
          <Link to="/">Zubcards</Link>
        </li>
        <li className="menu__item">
          <Link to="/decks">Decks</Link>
        </li>
        <li>
          <div className="dropdown flex" ref={menuRef}>
            <div
              onClick={() => setOpenToggle(!openToggle)}
              className="dropdown__icon"
            >
              <FaUserLarge />
            </div>

            <ul
              className={`dropdown__menu ${
                openToggle ? "dropdown__menu--active" : ""
              }`}
            >
              <li className="dropdown__menu__item">Decks</li>
              <li className="dropdown__menu__item">Profile</li>
              <li className="dropdown__menu__item">Settings</li>
              <li className="dropdown__menu__item">Log out</li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
