import MCQ from '../MCQ'
import { useState } from 'react';
const ZeroDayExploitMCQ = () => {
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const handleQuizSubmit = () => {
        setQuizSubmitted(true);
      };

    return (
        <>
            <MCQ attack_id={5} showNav={true} onQuizSubmit={handleQuizSubmit}/>
        </>
    )
}
export default ZeroDayExploitMCQ