import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile({ userId }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://192.168.106.29:4040/profile/${userId}`);
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>User data not available</div>;
    }

    return (
        <div style={styles.profileContainer}>
            <h2>My Profile</h2>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Roll Number:</strong> {userData.rollNumber}</p>
            <p><strong>Hall:</strong> {userData.hall}</p>
            <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
            <p><strong>Email:</strong> {userData.email}</p>
        </div>
    );
}

const styles = {
    profileContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '0 auto',
    },
};

export default Profile;
