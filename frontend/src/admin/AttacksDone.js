import { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/admin/attacksDone.css';
import Sidebar from './Sidebar'

const AttacksDone = () => {
    const [summaryData, setSummaryData] = useState([]);
    const [selectedAttack, setSelectedAttack] = useState(null);
    const [detailsData, setDetailsData] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8800/api/admin/completedAttacksSummary')
            .then(res => {
                setSummaryData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleRowClick = (attack_id) => {
        axios.get('http://localhost:8800/api/admin/completedAttackDetails', {
            params: { attack_id }
        })
            .then(res => {
                setDetailsData(res.data);
                setSelectedAttack(attack_id);
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Sidebar />
            <div className="admin-container">
                <h1>Admin Page</h1>
                <table className="summary-table">
                    <thead>
                        <tr>
                            <th>Attack Name</th>
                            <th>Completed Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summaryData.map((item, index) => (
                            <tr key={index} onClick={() => handleRowClick(item.attack_id)}>
                                <td>{item.attack_name}</td>
                                <td>{item.completed_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedAttack && (
                    <div className="details-container">
                        <h2>Details for Attack ID: {selectedAttack}</h2>
                        <table className="details-table">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>User Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detailsData.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.user_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default AttacksDone;
