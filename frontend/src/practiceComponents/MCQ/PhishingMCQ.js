import MCQ from '../MCQ'
import { useState } from 'react';
const PhishingMCQ = () => {
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const handleQuizSubmit = () => {
        setQuizSubmitted(true);
      };

    return (
        <>
            <MCQ attack_id={2} showNav={true} onQuizSubmit={handleQuizSubmit}/>
        </>
    )
}
export default PhishingMCQ