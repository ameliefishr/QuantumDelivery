import { useState } from 'react';
import './App.css'
import QLogo from './assets/quantumicon.png'
import Button from '@mui/material/Button';

// Array of quantum computing facts
const quantumFacts = [
    "Quantum computers use qubits instead of traditional bits.",
    "Superposition allows qubits to be in multiple states simultaneously.",
    "Quantum entanglement enables correlations between qubits regardless of distance.",
    "Quantum computing has the potential to solve complex problems much faster than classical computers.",
    "Quantum algorithms, such as Shor's algorithm, can efficiently factor large numbers.",
    "Error correction is a significant challenge in building practical quantum computers.",
    "Quantum supremacy refers to the ability of quantum computers to outperform classical computers in certain tasks.",
    "Quantum cryptography offers theoretically unbreakable encryption methods."
];

const RandomFactGenerator = () => {
    const [fact, setFact] = useState(quantumFacts[0]);

    const generateFact = () => {
        const randomIndex = Math.floor(Math.random() * quantumFacts.length);
        setFact(quantumFacts[randomIndex]);
    };

    return (
        <div>
            <img src={QLogo} className="icon" alt="Quantum logo" />
            <h1>Quantum Computing Facts</h1>
            <div className="fact-container">
                <div>
                    <p>{fact}</p>
                </div>
                <Button variant='contained' color='secondary' onClick={generateFact}  >New Fact</Button>
            </div>
        </div>
    );
};

export default RandomFactGenerator;
