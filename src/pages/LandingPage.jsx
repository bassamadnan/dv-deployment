import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleNavigation = (url) => {
        window.location.href = url;
    };

    return (
        <div className="landing-page-container">
            <h1 className="heading">Economics of Asylum Countries</h1>
            <p className="subheading">Made by Bassam Adnan, Bipasha Garg, Devika Bej</p>
            <div className="button-container" style={{padding:"50px"}}>
                <button className="button" onClick={() => handleNavigation('https://www.youtube.com')}>Demo Video</button>
                <button className="button" onClick={() => navigate('/home')}>Home Page</button>
                <button className="button" onClick={() => handleNavigation('https://www.youtube.com')}>Report</button>
                <button className="button" onClick={() => handleNavigation('https://github.com/bassamadnan/dv-deployment')}>Source Code</button>
            </div>
        </div>
    );
}

export default LandingPage;