import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./heading.css";
import NavLinks from "./Nav-links";
import SideDrawer from "../UIElements/SideDrawer";
import BackDrop from "../UIElements/BackDrop";
const Heading = (props) => {
  const [sideDrawer, setSideDrawer] = useState(false);

  const showSideDrawer = () => {
    setSideDrawer(true);
  };

  const removeSideDrawer = () => {
    setSideDrawer(false);
  };

  return (
    <Header>
      <button className="btn-navbar-open" onClick={showSideDrawer}>
        <span />
        <span />
        <span />
      </button>

      <Link className="links" to="/">
        Vacation
      </Link>
      <NavLinks className="nav-links" />
      {sideDrawer && <BackDrop onCancel={removeSideDrawer} />}
      <SideDrawer
        show={sideDrawer}
         onClick = {removeSideDrawer}
      >
        <NavLinks />
      </SideDrawer>
    </Header>
  );
};

export default Heading;
