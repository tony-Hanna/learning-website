import MCQ from '../MCQ'
import { useState } from 'react';
const ReplayMCQ = () => {
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const handleQuizSubmit = () => {
        setQuizSubmitted(true);
      };

    return (
        <>
            <MCQ attack_id={8} showNav={true} onQuizSubmit={handleQuizSubmit}/>
        </>
    )
}
export default ReplayMCQ