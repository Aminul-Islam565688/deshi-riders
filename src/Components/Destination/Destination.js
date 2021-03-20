import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import map from '../../images/Map.png'
import GMap from '../Map/Map';
import './Destination.css'

const Destination = () => {
    const [vehicle, setVehicle] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [rideSearch, setRideSearch] = useState(false)
    const [destination, setDestination] = useState({
        pickFrom: '',
        pickTo: '',
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
        let newRide = vehicle.filter(ride => ride.location === pickFrom && ride.vehicle === loggedInUser.vehicle)
        console.log(newRide);
    }
    console.log(loggedInUser.vehicle);
    const iframe = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.1973954431123!2d90.39191371465998!3d23.740339284594366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bfe09f2fc9%3A0x1da49bc0abfd4f7a!2sShahbagh%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1616260859240!5m2!1sen!2sbd" width="650" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'; 
    function Iframe(props) {
        return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
      }
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
            <div className='google-map-code'>
            <Iframe iframe={iframe} />,
            </div>
        </div>

    );
};

export default Destination;