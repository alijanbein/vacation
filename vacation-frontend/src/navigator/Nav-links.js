import "./nav-links.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import { RiLogoutCircleRLine } from "react-icons/ri";

const NavLinks = (props) => {
  const Auth = useContext(AuthContext);
  return (
    <nav className={`nav ${props.className}`}>
      <ul>
        <li>
        </li>
        <li>
          {Auth.isLoggedIn && <NavLink to="/add_vacation">Add Avaction </NavLink>}
        </li>
        <li>
          {Auth.isLoggedIn && <NavLink to="/my_vacation">My Vacations</NavLink>}
        </li>
        <li>
          {Auth.isLoggedIn && <NavLink onClick={Auth.logout} to ='/auth'> <RiLogoutCircleRLine style={{marginRight:'5px',}} /> logout</NavLink>}
        </li>
      
      </ul>
    </nav>
  );
};

export default NavLinks;
