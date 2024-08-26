import MCQ from '../MCQ'
import { useState } from 'react';
const BruteForceMCQ = () => {
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const handleQuizSubmit = () => {
        setQuizSubmitted(true);
      };

    return (
        <>
            <MCQ attack_id={4} showNav={true} onQuizSubmit={handleQuizSubmit}/>
        </>
    )
}
export default BruteForceMCQ