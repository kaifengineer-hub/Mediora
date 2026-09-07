import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./Header.css";
import appointmentContext from "./appointmentContext";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  const{setSearch,search}=useContext(appointmentContext)

useEffect(() => {
  const handleScroll = () => {
    const shouldScroll = window.scrollY > 50;

    setScrolled(prev =>
      prev !== shouldScroll ? shouldScroll : prev
    );
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);


const location = useLocation();

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
          <div className="logo">MEDIORA</div>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/appointmentData">Appointments</NavLink>
          <NavLink to="/ambulance">Ambulance</NavLink>
          <NavLink to="/emergencyBooking">EMERGENCY BOOKING</NavLink>
          <NavLink to="/Bookings">Bookings</NavLink>
        </div>
        {location.pathname === "/" && (
  <input
    className="search-input"
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search your trusted hospital..."
  />
)}

        
      </nav>
    </header>
  );
};

export default Header;