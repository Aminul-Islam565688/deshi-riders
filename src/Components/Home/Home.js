import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import bike from '../../images/Frame.png'
import car from '../../images/Frame-1.png'
import bus from '../../images/Frame-2.png'
import train from '../../images/Group.png'
import './Home.css'
import { UserContext } from '../../App';

const Home = () => {
 let history = useHistory();
 const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  const handleClick = (e) => {
    history.push("/destination");
    const selectedVehicle = {...loggedInUser};
    selectedVehicle.vehicle = e;
    setLoggedInUser(selectedVehicle)
  }
  console.log(loggedInUser.vehicle);
    return (
        <div className='ride'>
            <div onClick={() => handleClick('bike')} className='ride-cart'>
                <img src={bike} alt=""/>
                <h4>Bike</h4>
            </div>
            <div onClick={() => handleClick('car')} className='ride-cart'>
                <img src={car} alt=""/>
                <h4>Car</h4>
            </div>
            <div onClick={() => handleClick('bus')} className='ride-cart'>
                <img src={bus} alt=""/>
                <h4>Bus</h4>
            </div>
            <div onClick={() => handleClick('train')} className='ride-cart'>
                <img src={train} alt=""/>
                <h4>Train</h4>
            </div>
        </div>
    );
};

export default Home;