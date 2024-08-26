import MCQ from '../MCQ'
import { useState } from 'react';
const SQLiMCQ = () => {
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const handleQuizSubmit = () => {
        setQuizSubmitted(true);
      };

    return (
        <>
            <MCQ attack_id={3} showNav={true} onQuizSubmit={handleQuizSubmit}/>
        </>
    )
}
export default SQLiMCQ