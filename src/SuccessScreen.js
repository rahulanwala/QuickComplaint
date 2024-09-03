import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SuccessScreen() {
    const location = useLocation();
    const { name } = location.state || { name: 'User' };
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            navigate('/');
        },5000);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, [navigate]);

    return (
        <div className="success-wrapper">
            <div className="content">
                <div className="checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#4CAF50" viewBox="0 0 24 24"><path d="M20.285 6.709l-9.284 9.992-5.285-5.424 1.343-1.322 3.942 4.047 7.941-8.57 1.343 1.277zm1.715-4.709h-18v2h18v-2zm-18 18h18v-2h-18v2z"/></svg>
                </div>
                <h1>Successfully Registered</h1>
                <p>Welcome {name}!</p>
                <p>Redirecting to login in {countdown} seconds...</p>
            </div>
            <style jsx>{`
                .success-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background: -webkit-linear-gradient(left, #003366,#004080,#0059b3, #0073e6);
                    font-family: 'Poppins', sans-serif;
                }
                .content {
                    text-align: center;
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                    animation: fadeIn 1s ease-in-out;
                }
                .checkmark {
                    margin-bottom: 20px;
                    animation: pop 0.6s ease-out;
                }
                h1 {
                    color: #4CAF50;
                    font-size: 32px;
                    margin-bottom: 10px;
                    font-weight: 700;
                }
                p {
                    color: #333;
                    font-size: 20px;
                    margin-bottom: 0;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pop {
                    0% { transform: scale(0.5); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
}

export default SuccessScreen;
