import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const MaintenanceForm = () => {
    const location = useLocation();
    const { rollNumber } = location.state || { rollNumber: 'User' };
    const [selectedIssue, setSelectedIssue] = useState('');
    const [customIssue, setCustomIssue] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    
    const handleSelectChange = (event) => {
        setSelectedIssue(event.target.value);
    };

    const handleCustomIssueChange = (event) => {
        setCustomIssue(event.target.value);
    };

    const handleRoomNumberChange = (event) => {
        setRoomNumber(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (roomNumber.trim() === '') {
            setError('Room number is required.');
            return;
        }
        try {
            const newComplaint = {
                text: selectedIssue === 'other' ? customIssue : selectedIssue,
                resolved: false, // Setting the status to pending initially
            };

            // Submit the complaint to the backend
            const response = await axios.post('http://192.168.106.29:4040/complaints', newComplaint);

            if (response.status === 201) {
                setSuccess('Complaint submitted successfully!');
                setError('');
            }
        } catch (error) {
            setError('Failed to submit the complaint.');
        }
    };

    const containerStyle = {
        backgroundColor: '#f8f9fa',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '450px',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        fontFamily: "'Poppins', sans-serif",
    };

    const h1Style = {
        color: '#343a40',
        marginBottom: '25px',
        fontSize: '24px',
        fontWeight: '600',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '500',
        textAlign: 'left',
        color: '#495057',
    };

    const selectStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ced4da',
        backgroundColor: '#e9ecef',
        fontSize: '16px',
        color: '#495057',
        marginBottom: '15px',
        transition: 'border-color 0.3s ease, background-color 0.3s ease',
        cursor: 'pointer',
    };

    const inputStyle = {
        width: '50%',
        display: 'flex',
        justifyContent: 'left',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ced4da',
        fontSize: '16px',
        color: '#495057',
        backgroundColor: '#f8f9fa',
        marginBottom: '15px',
        transition: 'border-color 0.3s ease, background-color 0.3s ease',
    };

    const inputStyle1 = {
        width: '95%',
        display: 'flex',
        justifyContent: 'left',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ced4da',
        fontSize: '16px',
        color: '#495057',
        backgroundColor: '#f8f9fa',
        marginBottom: '15px',
        transition: 'border-color 0.3s ease, background-color 0.3s ease',
    };

    const buttonWrapperStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '25px',
    };

    const buttonStyle = {
        width: '50%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const errorStyle = {
        color: 'red',
        marginTop: '10px',
    };

    const successStyle = {
        color: 'green',
        marginTop: '10px',
    };

    return (
        <div style={containerStyle}>
            <h2 style={h1Style}>Select Maintenance Issue</h2>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle} htmlFor="room-number">Room Number:</label>
                <input
                    type="text"
                    id="room-number"
                    placeholder="Enter your room number"
                    style={inputStyle}
                    value={roomNumber}
                    onChange={handleRoomNumberChange}
                />
                <label style={labelStyle} htmlFor="maintenance-issue">Choose an issue:</label>
                <select
                    id="maintenance-issue" 
                    name="maintenance-issue"
                    style={selectStyle}
                    value={selectedIssue}
                    onChange={handleSelectChange}
                >
                    <option value="">-- Select an issue --</option>
                    <option value="Fan not Working">Fan not Working</option>
                    <option value="Bulb Fused/Flickering">Bulb Fused/Flickering</option>
                    <option value="Poor Wi-Fi">Poor Wi-Fi</option>
                    <option value="Defective Charging Port">Defective Charging Port</option>
                    <option value="Electric Shocks">Electric Shocks</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="General Repairs">General Repairs</option>
                    <option value="Outdoor Maintenance">Outdoor Maintenance</option>
                    <option value="Safety Concerns">Safety Concerns</option>
                    <option value="other">Other</option>
                </select>
                {selectedIssue === 'other' && (
                    <input
                        type="text"
                        placeholder="Describe your issue"
                        style={inputStyle1}
                        value={customIssue}
                        onChange={handleCustomIssueChange}
                    />
                )}
                {error && <p style={errorStyle}>{error}</p>}
                {success && <p style={successStyle}>{success}</p>}
                <div style={buttonWrapperStyle}>
                    <button type="submit" style={buttonStyle}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default MaintenanceForm;
