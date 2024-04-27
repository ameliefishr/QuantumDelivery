import { useState, useEffect } from 'react';
import './App.css'
import QLogo from './assets/quantumicon.png'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


const RandomFactGenerator = () => {
    const [fact, setFact] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch random fact on component mount
    useEffect(() => {
        fetchRandomFact();
    }, []); // Empty dependency array ensures the effect runs only once on mount


    // Function to fetch random fact from the backend
    const fetchRandomFact = async () => {
        setLoading(true)
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
            setLoading(false);
        }
    };

    return (
        <div>
            <img src={QLogo} className="icon" alt="Quantum logo" />
            <h1>Quantum Computing Facts</h1>
            <div className="fact-container">
                <div>
                    <p>{fact}</p>
                </div>
                <Button variant={loading ? 'disabled' : 'contained' } color='secondary' onClick={fetchRandomFact}  >
                {loading ? <CircularProgress size={24} /> : 'New Fact'}</Button>
            </div>
        </div>
    );
};

export default RandomFactGenerator;
