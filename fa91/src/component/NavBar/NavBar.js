import React from "react";
import ThemeContext from "../../context/ThemeContext";



export default function NavBar() {
    const {isLightTheme, light, dark} = useContext(ThemeContext);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ islightTheme: "light" ? "dark";}}>
                <link className="navbar-brand" href="#">Navbar</link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <link className="nav-link" href="#">Home <span className="sr-only">(current)</span></link>
                        </li>
                        <li className="nav-item">
                            <link className="nav-link" href="#">Features</link>
                        </li>
                        <li className="nav-item">
                            <link className="nav-link" href="#">Pricing</link>
                        </li>
                        <li className="nav-item">
                            <link className="nav-link disabled" href="#">Disabled</link>
                        </li>
                    </ul>
                    </div>
            </nav>
        </>
        
    )
}
