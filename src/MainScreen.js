import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ComplainList from './ComplainList';
import StatusUpdate from './StatusUpdate';
import GuideLines from './GuideLines';

function MainScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state || {};
    const [activeTab, setActiveTab] = useState('StatusUpdate');
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const openTab = (tabName) => {
        setActiveTab(tabName);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const myProfile = () => {
        alert("Update Profile clicked");
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('userSession'); 
        navigate('/');
    };

    const closeProfileMenu = (event) => {
        if (!event.target.matches('.profile-icon')) {
            setProfileMenuOpen(false);
        }
    };

    window.onclick = closeProfileMenu;

    return (
        <div style={styles.body}>
            <div className="header" style={styles.header}>
                <div className="tablinks-left" style={styles.tablinksLeft}>
                    <button
                        className={`tablink ${activeTab === 'StatusUpdate' ? 'active' : ''}`}
                        onClick={() => openTab('StatusUpdate')}
                        style={activeTab === 'StatusUpdate' ? { ...styles.tablink, ...styles.tablinkActive } : styles.tablink}
                    >
                        Status Update
                    </button>
                    <button
                        className={`tablink ${activeTab === 'Announcements' ? 'active' : ''}`}
                        onClick={() => openTab('Announcements')}
                        style={activeTab === 'Announcements' ? { ...styles.tablink, ...styles.tablinkActive } : styles.tablink}
                    >
                        Announcements
                    </button>
                    <button
                        className={`tablink ${activeTab === 'Guidelines' ? 'active' : ''}`}
                        onClick={() => openTab('Guidelines')}
                        style={activeTab === 'Guidelines' ? { ...styles.tablink, ...styles.tablinkActive } : styles.tablink}
                    >
                        Guidelines
                    </button>
                    <button
                        className={`tablink ${activeTab === 'Support' ? 'active' : ''}`}
                        onClick={() => openTab('Support')}
                        style={activeTab === 'Support' ? { ...styles.tablink, ...styles.tablinkActive } : styles.tablink}
                    >
                        Support
                    </button>
                    <button
                        className={`tablink ${activeTab === 'AddComplaints' ? 'active' : ''}`}
                        onClick={() => openTab('AddComplaints')}
                        style={activeTab === 'AddComplaints' ? { ...styles.tablink, ...styles.tablinkActive } : styles.tablink}
                    >
                        Add Complaints
                    </button>
                </div>
                <div className="profile" style={styles.profile}>
                    <button className="profile-icon" onClick={toggleProfileMenu} style={styles.profileIcon}>
                        <i className="fas fa-user"></i> Profile
                    </button>
                    {profileMenuOpen && (
                        <div id="profileMenu" className="profile-menu" style={styles.profileMenu}>
                            <button onClick={myProfile} style={styles.profileMenuButton}>My Profile</button>
                            <button onClick={logout} style={styles.profileMenuButton}>Logout</button>
                        </div>
                    )}
                </div>
            </div>

            <div id="StatusUpdate" className="tabcontent" style={activeTab === 'StatusUpdate' ? styles.tabcontent : { display: 'none' }}>
                <h3 style={styles.tabTitle}>Status Update</h3>
                {activeTab === 'StatusUpdate' && <StatusUpdate />}
            </div>

            <div id="Announcements" className="tabcontent" style={activeTab === 'Announcements' ? styles.tabcontent : { display: 'none' }}>
                <h3 style={styles.tabTitle}>Announcements</h3>
                <p>Saturday & Sunday Off</p>
            </div>

            <div id="Guidelines" className="tabcontent" style={activeTab === 'Guidelines' ? styles.tabcontent : { display: 'none' }}>
                <h3 style={styles.tabTitle}>Guidelines</h3>
                {activeTab === 'Guidelines' && <GuideLines />}
            </div>

            <div id="Support" className="tabcontent" style={activeTab === 'Support' ? styles.tabcontent : { display: 'none' }}>
                <h3 style={styles.tabTitle}>Support</h3>
                <p>If your issue is not resolved within 7 days of submitting a complaint, please don't hesitate to reach out to us directly at <a href="mailto: electricissue@krlebhai.com">electricissue@krlebhai.com</a>. We're here to help!
                </p>
            </div>

            <div id="AddComplaints" className="tabcontent" style={activeTab === 'AddComplaints' ? styles.tabcontent : { display: 'none' }}>
                <h3 style={styles.tabTitle}>Add Complaints</h3>
                {activeTab === 'AddComplaints' && <ComplainList />}
            </div>

            <footer style={styles.footer}>
                <p>&copy; 2024 Hostel Management System. All Rights Reserved.</p>
                <p>Designed by KGPIAN</p>
            </footer>
        </div>
    );
}

const styles = {
    //fsdf
    body: {
        fontFamily: 'Arial, sans-serif',
        background: '-webkit-linear-gradient(left, #003366,#004080,#0059b3, #0073e6)',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    tabcontent: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#ffffff',  // Ensure it's a solid white background without transparency
        margin: '10px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'opacity 0.5s ease',
        opacity: 1,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: '10px 20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    tablinksLeft: {
        display: 'flex',
        gap: '10px',
    },
    tablink: {
        backgroundColor: 'transparent',
        color: 'white',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        padding: '14px 20px',
        fontSize: '17px',
        borderRadius: '5px',
        transition: 'background-color 0.3s, transform 0.3s',
    },
    tablinkHover: {
        backgroundColor: '#3b9fcf',
    },
    tablinkActive: {
        backgroundColor: '#1f639f',
        transform: 'scale(1.1)',
    },
    tabcontent: {
        flex: 1,
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        margin: '10px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'opacity 0.5s ease',
        opacity: 1,
    },
    tabTitle: {
        color: '#2980b9',
        borderBottom: '2px solid #2980b9',
        paddingBottom: '10px',
        marginBottom: '20px',
    },
    complaintsTable: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    complaintsTableThTd: {
        padding: '12px',
        textAlign: 'left',
        border: '1px solid #ddd',
    },
    complaintsTableTh: {
        backgroundColor: '#2980b9',
        color: 'white',
    },
    complaintsTableEvenRow: {
        backgroundColor: '#f9f9f9',
    },
    profile: {
        position: 'relative',
    },
    profileIcon: {
        backgroundColor: 'inherit',
        color: 'white',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        padding: '14px 20px',
        fontSize: '17px',
        transition: 'background-color 0.3s, transform 0.3s',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '5px',
    },
    profileMenu: {
        display: 'block',
        position: 'absolute',
        right: 0,
        top: '50px',
        backgroundColor: '#2980b9',
        borderRadius: '5px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1,
    },
    profileMenuButton: {
        backgroundColor: '#2980b9',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        textAlign: 'left',
        width: '100%',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    profileMenuButtonHover: {
        backgroundColor: '#1f639f',
    },
    footer: {
        backgroundColor: '#2980b9',
        color: 'white',
        textAlign: 'center',
        padding: '10px 0',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.2)',
        marginTop: 'auto',
    },
};

export default MainScreen;
