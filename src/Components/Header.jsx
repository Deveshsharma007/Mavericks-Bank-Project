import React from 'react'
import './Header.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Header = () => {

   // const { customerId } = useParams();
    const { token, setToken } = useAuth();
    const navigate = useNavigate();

    const logOut = () => {
        setToken(null);
        navigate("/");
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className='logo-image'>
                            <img src="C:\Users\hp\Downloads\React files\bankapp\src\Images\mavericks-bank-high-resolution-logo.jpeg" alt="Logo" width="70" height="24" />
                        </div>
                        <Link className="brand" style={{ color: 'white' }} to="/home">
                            MAVERICKS BANK</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon">
                            </span>
                        </button>
                        <div className="collapse navbar-collapse " style={{ marginLeft: '27%' }} id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active " aria-current="page" to={`/`}><button className='btn btn-primary' style={{ backgroundColor: '#2f6348' }}>Home</button></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">
                                        <button className='btn btn-primary' style={{ backgroundColor: '#2f6348' }}>About US</button></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/"><button className='btn btn-primary' style={{ backgroundColor: '#2f6348' }}>Contact Us</button></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        {(token !== null) && (
                            <button className="Button" onClick={logOut}>

                                <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

                                <div className="text">Log-Out</div>
                            </button>
                        )}
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header
