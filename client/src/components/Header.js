import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, handleLogout }) => {
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <header>
            <nav className='d-flex align-items-center justify-content-between p-3'>          
                <button onClick={() => navigate("/")}>Home</button>
                <div className='col-11'>
                    {!isAuthenticated ? (
                        <div className='d-flex align-items-center justify-content-end'>
                            <button onClick={() => navigate("/register")} className='ms-2'>Register</button>
                            <button onClick={() => navigate("/login")} className='ms-2'>Login</button>
                        </div>
                    ) : (
                        <div className='d-flex align-items-center justify-content-between'>
                            <button onClick={() => navigate("/create-quiz")} className='ms-2'>Create Quiz</button>
                            <button onClick={onLogout} className='ms-2'>Logout</button>
                        </div>
                    )}  
                </div>              
            </nav>
        </header>
    );
};

export default Header;




