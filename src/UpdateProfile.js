import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfile = ({ userId }) => {
    const [profile, setProfile] = useState({
        id: userId,
        name: '',
        email: '',
        phoneNumber: '',
        hall: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (profile.password !== profile.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.put('http://192.168.106.29:4040/update-profile', profile);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={profile.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={profile.email}
                onChange={handleChange}
            />
            <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={profile.phoneNumber}
                onChange={handleChange}
            />
            <input
                type="text"
                name="hall"
                placeholder="Hall"
                value={profile.hall}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="New Password"
                value={profile.password}
                onChange={handleChange}
            />
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={profile.confirmPassword}
                onChange={handleChange}
            />
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default UpdateProfile;
