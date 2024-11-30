import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div style={{minHeight: "8vh"}} className={'bg-body-secondary'}>
            <div className="d-flex justify-content-center align-content-center">
                <p className={'text-center mt-3 mb-0'}><span className={'fw-bold'}>Powdered by</span> &nbsp;<a className={'link-primary'} target={"_blank"} href={'https://finnhub.io/'}>Finnhub.io</a></p>
            </div>
        </div>
    );
};

export default Footer;
