import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import '../../styles/lab/XSS.css';

const api = axios.create({
    baseURL: 'http://localhost:8800', // Your backend server
});

const XSSLab = ({showNav}) => {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await api.get('/comments');
            setComments(response.data);
        } catch (error) {
            setMessage('Error fetching comments');
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/comments', { username, comment });
            setMessage(response.data);
            fetchComments();
        } catch (error) {
            setMessage('Error submitting comment');
        }
    };
    //Check if user did the quiz
    const  [quiz, setQuiz] = useState(null)
    const [loading, setLoading] = useState(null)
    const attack_id = 6

    const [id, setId] = useState(0)
    useEffect(() => {
        axios.get('http://localhost:8800')
        .then(res => {
            if(res.data.valid) {
                setId(res.data.id);
            }
        })
        .catch(err => console.log(err));

    }, []);
    useEffect(() => {
        if (id !== 0) {   //id should set before making this request

        axios.get('http://localhost:8800/check-quiz-section', {
            params: {
                id,
                attack_id
            }
        }).then(res => {
            setQuiz(res.data.quiz)
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false); 
        });
    }
    }, [id]);

    // if (quiz) {
    //     axios.put('http://localhost:8800/update-lab-section', {
    //         id,
    //         attack_id
    //     }).then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => console.log(err));
    // }
    if (quiz === null) {
        return (
            <>
                {showNav && <Navbar />}
                <div>Loading...</div>
            </>
        ); // Show a loading indicator while data is being fetched
    }
    const warningStyle = {
        color: 'red',
        fontSize: '24px',
        textAlign: 'center',
        marginTop: '20px'
    };
    if (!quiz) {
        return (
            <>
                {showNav && <Navbar />}
                <h2 style={warningStyle}>you should practice the lesson first</h2>
            </>
        )
    }
    return (
        <>
            {showNav && <Navbar />}
            <div className="xss-lab">
                <h1>Cross-Site Scripting (XSS) Lab</h1>
                <form onSubmit={handleCommentSubmit} className="comment-form">
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter your username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Comment</label>
                        <textarea 
                            placeholder="Enter your comment" 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">Submit Comment</button>
                </form>
                <p className="message">{message}</p>
                <h2>Comments</h2>
                <div className="comments">
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                        <p><strong>{comment.username}</strong>: <span dangerouslySetInnerHTML={{ __html: comment.comment }}></span></p>
                        </div>
                    ))}
                </div>
                
            </div>
        </>
    );
};

export default XSSLab;
