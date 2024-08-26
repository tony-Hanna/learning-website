import MCQ from '../MCQ'
import { useState } from 'react';
const DOS = () => {
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const handleQuizSubmit = () => {
        setQuizSubmitted(true);
      };

    return (
        <>
            <MCQ attack_id={7} showNav={true} onQuizSubmit={handleQuizSubmit}/>
        </>
    )
}
export default DOS