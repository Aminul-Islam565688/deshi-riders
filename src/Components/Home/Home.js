import React from 'react';
import bike from '../../images/Frame.png'
import car from '../../images/Frame-1.png'
import bus from '../../images/Frame-2.png'
import train from '../../images/Group.png'
import './Home.css'

const Home = () => {
    return (
        <div className='ride'>
            <div className='ride-cart'>
                <img src={bike} alt=""/>
                <h4>Bike</h4>
            </div>
            <div className='ride-cart'>
                <img src={car} alt=""/>
                <h4>Car</h4>
            </div>
            <div className='ride-cart'>
                <img src={bus} alt=""/>
                <h4>Bus</h4>
            </div>
            <div className='ride-cart'>
                <img src={train} alt=""/>
                <h4>Train</h4>
            </div>
        </div>
    );
};

export default Home;