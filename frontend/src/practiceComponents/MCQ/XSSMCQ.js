import MCQ from '../MCQ'
import { useState } from 'react';
const XSSMCQ = () => {
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const handleQuizSubmit = () => {
        setQuizSubmitted(true);
      };

    return (
        <>
            <MCQ attack_id={6} showNav={true} onQuizSubmit={handleQuizSubmit}/>
        </>
    )
}
export default XSSMCQ