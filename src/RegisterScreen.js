import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterScreen() {
    const [loginActive, setLoginActive] = useState(true);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [hall, setHall] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); 

    const handleFormToggle = (loginSelected) => {
        setLoginActive(loginSelected);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://192.168.106.29:4040/register', {
                name,
                rollNumber,
                hall,
                phoneNumber,
                email,
                password,
                confirmPassword,
            });
            setSuccess('Registration successful! User ID: ' + response.data.id);
            navigate('/success', { state: { name: name } });
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        try {
            const response = await axios.post('http://192.168.106.29:4040/login', {
                rollNumber,
                password,
            });
            setSuccess('Login successful!');
            navigate('/main', { state: { id: response.data.id } });
        } catch (err) {
            console.error(err.response); // Log the entire error response
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Login failed. Please try again.');
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };    

    return (
        <div className="wrapper">
            <div className="title-text">
                <div className={`title ${loginActive ? 'login' : 'signup'}`}>
                    {loginActive ? 'Login Form' : 'Signup Form'}
                </div>
            </div>
            <div className="form-container">
                <div className="slide-controls">
                    <input 
                        type="radio" 
                        name="slide" 
                        id="login" 
                        checked={loginActive} 
                        onChange={() => handleFormToggle(true)} 
                    />
                    <input 
                        type="radio" 
                        name="slide" 
                        id="signup" 
                        checked={!loginActive} 
                        onChange={() => handleFormToggle(false)} 
                    />
                    <label 
                        htmlFor="login" 
                        className="slide login"
                    >
                        Login
                    </label>
                    <label 
                        htmlFor="signup" 
                        className="slide signup"
                    >
                        Signup
                    </label>
                    <div className="slider-tab"></div>
                </div>
                <div className="form-inner">
                    {loginActive ? (
                        <form onSubmit={handleLogin} className="login">
                            <div className="field">
                                <input 
                                    type="text" 
                                    placeholder="Roll Number" 
                                    value={rollNumber}
                                    onChange={(e) => setRollNumber(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="field">
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>
                            {/* <div className="pass-link"><a href="#">Forgot password?</a></div> */}
                            <div className="field btn">
                                <div className="btn-layer"></div>
                                <input type="submit" value="Login" />
                            </div>
                            <div className="signup-link">Not a member? <button onClick={() => handleFormToggle(false)} className="link-button">Signup now</button></div>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} className="signup">
                            <div className="field">
                                <input 
                                    type="text" 
                                    placeholder="Name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="field">
                                <input 
                                    type="text" 
                                    placeholder="Roll Number" 
                                    value={rollNumber}
                                    onChange={(e) => setRollNumber(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="field">
                                <input 
                                    type="text" 
                                    placeholder="Hall of Residence" 
                                    value={hall}
                                    onChange={(e) => setHall(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="field">
                                <input 
                                    type="text" 
                                    placeholder="Phone Number" 
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="field">
                                <input 
                                    type="email" 
                                    placeholder="Email ID" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="field">
                                <input 
                                    type="password" 
                                    placeholder="Create Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="field">
                                <input 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="field btn">
                                <div className="btn-layer"></div>
                                <input type="submit" value="Signup" />
                            </div>
                        </form>
                    )}
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </div>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
                *{
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: 'Poppins', sans-serif;
                }
                html,body{
                  display: grid; 
                  height: 100%;
                  width: 100%;
                  place-items: center;
                  background: -webkit-linear-gradient(left, #003366,#004080,#0059b3, #0073e6);
                }
                ::selection{
                  background: #1a75ff;
                  color: #fff;
                }
                .wrapper{
                  overflow: hidden;
                  max-width: 390px;
                  background: #fff;
                  padding: 30px;
                  border-radius: 15px;
                  box-shadow: 0px 15px 20px rgba(0,0,0,0.1);
                }
                .wrapper .title-text{
                  display: flex;
                  width: 200%;
                }
                .wrapper .title{
                  width: 50%;
                  font-size: 35px;
                  font-weight: 600;
                  text-align: center;
                  transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
                }
                .wrapper .slide-controls{
                  position: relative;
                  display: flex;
                  height: 50px;
                  width: 100%;
                  overflow: hidden;
                  margin: 30px 0 10px 0;
                  justify-content: space-between;
                  border: 1px solid lightgrey;
                  border-radius: 15px;
                }
                .slide-controls .slide{
                  height: 100%;
                  width: 100%;
                  color: #fff;
                  font-size: 18px;
                  font-weight: 500;
                  text-align: center;
                  line-height: 48px;
                  cursor: pointer;
                  z-index: 1;
                  transition: all 0.6s ease;
                }
                .slide-controls label.signup{
                  color: #000;
                }
                .slide-controls .slider-tab{
                  position: absolute;
                  height: 100%;
                  width: 50%;
                  left: 0;
                  z-index: 0;
                  border-radius: 15px;
                  background: -webkit-linear-gradient(left,#003366,#004080,#0059b3, #0073e6);
                  transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
                }
                input[type="radio"]{
                  display: none;
                }
                #signup:checked ~ .slider-tab{
                  left: 50%;
                }
                #signup:checked ~ label.signup{
                  color: #fff;
                  cursor: default;
                  user-select: none;
                }
                #signup:checked ~ label.login{
                  color: #000;
                }
                #login:checked ~ label.signup{
                  color: #000;
                }
                #login:checked ~ label.login{
                  cursor: default;
                  user-select: none;
                }
                .wrapper .form-container{
                  width: 100%;
                  overflow: hidden;
                }
                .form-container .form-inner{
                  display: flex;
                  width: 200%;
                }
                .form-container .form-inner form{
                  width: 50%;
                  transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
                }
                .form-inner form .field{
                  height: 50px;
                  width: 100%;
                  margin-top: 20px;
                }
                .form-inner form .field input{
                  height: 100%;
                  width: 100%;
                  outline: none;
                  padding-left: 15px;
                  border-radius: 15px;
                  border: 1px solid lightgrey;
                  border-bottom-width: 2px;
                  font-size: 17px;
                  transition: all 0.3s ease;
                }
                .form-inner form .field input:focus{
                  border-color: #1a75ff;
                }
                .form-inner form .field input::placeholder{
                  color: #999;
                  transition: all 0.3s ease;
                }
                form .field input:focus::placeholder{
                  color: #1a75ff;
                }
                .form-inner form .pass-link{
                  margin-top: 5px;
                }
                .form-inner form .signup-link{
                  text-align: center;
                  margin-top: 30px;
                }
                .form-inner form .pass-link a,
                .form-inner form .signup-link a{
                  color: #1a75ff;
                  text-decoration: none;
                }
                .form-inner form .pass-link a:hover,
                .form-inner form .signup-link a:hover{
                  text-decoration: underline;
                }
                form .btn{
                  height: 50px;
                  width: 100%;
                  border-radius: 15px;
                  position: relative;
                  overflow: hidden;
                }
                form .btn .btn-layer{
                  height: 100%;
                  width: 300%;
                  position: absolute;
                  left: -100%;
                  background: -webkit-linear-gradient(right,#003366,#004080,#0059b3, #0073e6);
                  border-radius: 15px;
                  transition: all 0.4s ease;
                }
                form .btn:hover .btn-layer{
                  left: 0;
                }
                form .btn input[type="submit"]{
                  height: 100%;
                  width: 100%;
                  z-index: 1;
                  position: relative;
                  background: none;
                  border: none;
                  color: #fff;
                  padding-left: 0;
                  border-radius: 15px;
                  font-size: 20px;
                  font-weight: 500;
                  cursor: pointer;
                }
                .link-button {
                    background: none;
                    border: none;
                    color: #1a75ff;
                    text-decoration: underline;
                    cursor: pointer;
                    font-size: inherit;
                    padding: 0;
                    font-family: inherit;
                }
                .link-button:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
}

export default RegisterScreen;
