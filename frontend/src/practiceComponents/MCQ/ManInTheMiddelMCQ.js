import MCQ from '../MCQ'
import { useState } from 'react';
const ManInTheMiddleMCQ = () => {
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const handleQuizSubmit = () => {
        setQuizSubmitted(true);
      };

    return (
        <>
            <MCQ attack_id={1} showNav={true} onQuizSubmit={handleQuizSubmit}/>
        </>
    )
}
export default ManInTheMiddleMCQ