import { useState, useEffect } from 'react';
import './App.css'
import Rlogo from './assets/route.png'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MapComponent from './MapComponent.jsx';


const RandomFactGenerator = () => {
    const [fact, setFact] = useState('');
    const [loadingFact, setLoadingFact] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [location, setLocation] = useState('Not Found');
    const [latitude, setLatitude] = useState(-70);
    const [longitude, setLongitude] = useState(115);

    // Fetch random fact on component mount
    useEffect(() => {
        fetchRandomFact();
        fetchRegion();
    }, []); // Empty dependency array ensures the effect runs only once on mount


    // Function to fetch random fact from the backend
    const fetchRandomFact = async () => {
        setLoadingFact(true);
        const startTime = performance.now(); // Record start time
        //'https://quantumdeliverybackend.azurewebsites.net/randomfact'
        try {
            const response = await fetch('https://quantumdeliverybackend.azurewebsites.net/randomfact');
            if (!response.ok) {
                throw new Error('Failed to fetch random fact');
            }
            const data = await response.json();
            setFact(data.fact);
        } catch (error) {
            console.error('Error fetching random fact:', error.message);
        } finally {
            setLoadingFact(false);
            const endTime = performance.now(); // Record end time
            const duration = endTime - startTime; // Calculate duration
            console.log('Request duration:', duration, 'milliseconds');
        }
    };


    // Function to fetch random fact from the backend
    const fetchRegion = async () => {
        setLoadingLocation(true);
        const startTime = performance.now(); // Record start time
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            if (!ipResponse.ok) {
                throw new Error('Failed to fetch IP address');
            }
            const ipData = await ipResponse.json();
            const userIP = ipData.ip;
            console.log("Ip is " + userIP);
    
            // Use user's IP address to fetch region information
            const response = await fetch(`https://ipapi.co/${userIP}/json/`);
            if (!response.ok) {
                console.log("error in fetch region response")
                throw new Error('Failed to fetch location information');
            }
            const data = await response.json();
            setLocation(`${data.city}, ${data.region}`);
            setLongitude(data.longitude)
            setLatitude(data.latitude)
            console.log("Latitude in fact gen is " + data.latitude)
        } catch (error) {
            console.error('Error fetching region:', error.message);
        } finally {
            setLoadingLocation(false);
            const endTime = performance.now(); // Record end time
            const duration = endTime - startTime; // Calculate duration
            console.log('Two Public API request duration:', duration, 'milliseconds');
        }
    };


    return (
        <div>
            <img src={Rlogo} className="icon" alt="Quantum logo" />
            <h1>Route Finder</h1>
            <div className="fact-container">
                <div>
                    <p>Azure Branch Updated 6/05/24 03:21 pm</p>
                </div>
                <div>
                    <p>{fact}</p>
                </div>
                <Button variant={loadingFact ? 'disabled' : 'contained' } color='secondary' onClick={fetchRandomFact}  >
                {loadingFact ? <CircularProgress size={24} /> : 'New Fact'}</Button>
            </div>
            <div className="region-container">
                <div>
                    <p>You are at: {location}</p>
                </div>
                <Button variant={loadingLocation ? 'disabled' : 'contained' } color='primary' onClick={fetchRegion}  >
                {loadingLocation? <CircularProgress size={24} /> : 'Read Location'}</Button>
            </div>

            <MapComponent longitude={longitude} latitude={latitude} />
            
        </div>
    );
};
////-32.01
export default RandomFactGenerator;
