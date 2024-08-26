import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "./Navbar";
import './styles/attacks.css';

const Attacks = () => {
    const [attacks, setAttacks] = useState([]);
    const [id, setId] = useState(0);
    const [completedAttacks, setCompletedAttacks] = useState({});
    const [allCompleted, setAllCompleted] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8800/attacks')
        .then(res => {
            setAttacks(res.data);
        })
        .catch(err => console.log(err));

        axios.get('http://localhost:8800')
        .then(res => {
            if(res.data.valid) {
                setId(res.data.id);
            }
        })
        .catch(err => console.log(err));
    }, []); 

    useEffect(() => {
        if (id !== 0) {
            const promises = attacks.map(attack => 
                axios.get('http://localhost:8800/api/checkAttackCompletion', {
                    params: { id, attack_id: attack.attack_id }
                })
                .then(res => {
                    setCompletedAttacks(prev => ({ ...prev, [attack.attack_id]: res.data.completed }));
                })
                .catch(err => console.log(err))
            );

            Promise.all(promises).then(() => {
                const allCompleted = attacks.every(attack => completedAttacks[attack.attack_id]);
                setAllCompleted(allCompleted);
            });
        }
    }, [id, attacks, completedAttacks]);

    return (
        <>
            <Navbar /> 
            <div className="attacks-container">
                {attacks.map((attack, index) => (
                    <div className="attack-item" key={attack.attack_id}>
                        <div className="progress-container">
                            <div className={`progress-node ${completedAttacks[attack.attack_id] ? 'completed' : ''}`}>
                                <span>{index + 1}</span>
                            </div>
                            {index < attacks.length - 1 && <div className="progress-line"></div>}
                        </div>
                        <div className="attack-card">
                            <h1>{attack.name}</h1>
                            <p>{attack.description}</p>
                            <p className="category">Category: {attack.category}</p>
                            <p className={`severity severity-${attack.severity_level.toLowerCase()}`}>
                                Severity: {attack.severity_level}
                            </p>
                            <div className="mitigation">
                                <span>Mitigation:</span> {attack.mitigation}
                            </div>
                            <Link to={`${attack.name.replace(/\s+/g, '')}`}>Learn more</Link>
                            {completedAttacks[attack.attack_id]? <p className="completed-text">Completed</p>:<p></p>}
                        </div>
                    </div>
                ))}
                <div className="final-exam-item">
                    <div className="progress-container">
                        <div className={`progress-node ${allCompleted ? 'completed' : 'locked'}`}>
                            <span>9</span>
                        </div>
                    </div>
                    <div className="attack-card">
                        <h1>Final Exam</h1>
                        <p>Complete the final exam to earn your certificate.</p>
                        {allCompleted ? (
                            <Link to="/final-exam">Start Final Exam</Link>
                        ) : (
                            <p className="locked-text">Complete all attacks to unlock the final exam</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Attacks;
