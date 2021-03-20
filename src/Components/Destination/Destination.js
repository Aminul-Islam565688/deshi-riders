import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import map from '../../images/Map.png'
import GMap from '../Map/Map';
import './Destination.css'

const Destination = () => {
    const [vehicle, setVehicle] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [destination, setDestination] = useState({
        pickFrom: '',
        pickTo: ''
    })
    useEffect(() => {
        fetch('https://api.jsonbin.io/b/60559ca77ffeba41c07e74f7/3')
            .then(res => res.json())
            .then(data => setVehicle(data))
    }, [])
    const handlePickTo = (e) => {
        const newDestination = { ...destination };
        newDestination[e.target.name] = e.target.value;
        setDestination(newDestination)
    }
    const handleSearchButton = () => {
        const { pickFrom, pickTo } = destination;
        const newRide = vehicle.filter(ride => ride.location === pickFrom)
        console.log(newRide);
    }
    console.log(loggedInUser);
    return (
        <div className='destination'>
            <img src={vehicle.img} alt="" />
            <div className='pick-up'>
                <h6>Pick Form</h6>
                <label for="pickFrom"></label>
                <select onChange={handlePickTo} name="pickFrom" id="pickFrom">
                    <option value="Mirpur">Mirpur</option>
                    <option value="Motijhil">Motijhil</option>
                    <option value="Khilgoan">Khilgoan</option>
                    <option value="Gulshan">Gulshan</option>
                    <option value="Banani">Banani</option>
                </select>
                <h6>Pick To</h6>
                <label for="pickTo"></label>
                <select onChange={handlePickTo} name="pickTo" id="pickTo">
                    <option value="Dhanmondi">Dhanmondi</option>
                    <option value="NilKhet">NilKhet</option>
                    <option value="Zurain">Zurain</option>
                    <option value="Jatrabari">Jatrabari</option>
                    <option value="Uttara">Uttara</option>
                </select>
                <input onClick={handleSearchButton} className='search-btn' type="button" name="" id="" value='Search' />
            </div>
            <div className='map'>
                <img src={map} alt="" />
            </div>
            <div>
                {/* <GMap></GMap> */}
            </div>
        </div>

    );
};

export default Destination;