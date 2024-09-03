// fsf
import React from 'react';
import { FaPlug, FaTools, FaExclamationTriangle, FaClock, FaBan } from 'react-icons/fa';

const GuideLines = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Hostel Safety Guidelines: Electrical Items</h1>
            <p style={styles.introText}>Dear Hostel Residents,</p>
            <p style={styles.introText}>
                For your safety and the safety of others, we request that you follow these guidelines when dealing with electrical items in your room:
            </p>
            <ul style={styles.list}>
                <li style={styles.listItem}>
                    <FaTools style={styles.icon} />
                    <div>
                        <strong>Do Not Attempt Repairs:</strong> If you find any electrical item (such as lights, fans, sockets, etc.) not working properly, do not attempt to fix it yourself. Tampering with electrical items can lead to accidents, including electric shocks, fires, or damage to property.
                    </div>
                </li>
                <li style={styles.listItem}>
                    <FaExclamationTriangle style={styles.icon} />
                    <div>
                        <strong>Report the Issue Immediately:</strong> Please report any malfunctioning electrical items to the hostel maintenance team immediately. You can do this by [mention how to report, e.g., contacting the hostel office, using the maintenance app, filling out a complaint form, etc.].
                    </div>
                </li>
                <li style={styles.listItem}>
                    <FaClock style={styles.icon} />
                    <div>
                        <strong>Exercise Patience:</strong> We understand that malfunctioning electrical items can be inconvenient. However, for your safety, it is important that you refrain from using these items until they have been inspected and repaired by a qualified technician. The maintenance team will address your concerns as promptly as possible.
                    </div>
                </li>
                <li style={styles.listItem}>
                    <FaPlug style={styles.icon} />
                    <div>
                        <strong>Unplug When Not in Use:</strong> As a precaution, always unplug electrical appliances when they are not in use. This reduces the risk of electrical hazards and ensures your safety.
                    </div>
                </li>
                <li style={styles.listItem}>
                    <FaBan style={styles.icon} />
                    <div>
                        <strong>Follow Hostel Rules:</strong> Adhere to all hostel rules and regulations regarding the use of electrical appliances. Unauthorized use of high-wattage appliances or overloading sockets is strictly prohibited.
                    </div>
                </li>
            </ul>
            <p style={styles.conclusion}>
                Your cooperation is crucial in maintaining a safe and secure living environment for everyone. If you have any concerns or questions, please feel free to reach out to the hostel management.
            </p>
            <p style={styles.footer}>
                Thank you for your understanding and patience.<br />
                <strong>Hostel Management</strong>
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '50px auto',
        backgroundColor: '#f9f9f9',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        color: '#444',
        lineHeight: '1.6',
    },
    header: {
        color: '#2c3e50',
        textAlign: 'center',
        fontSize: '28px',
        marginBottom: '20px',
        borderBottom: '2px solid #2980b9',
        paddingBottom: '10px',
    },
    introText: {
        fontSize: '16px',
        marginBottom: '20px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '15px',
    },
    icon: {
        color: '#2980b9',
        marginRight: '10px',
        fontSize: '20px',
        flexShrink: 0,
    },
    conclusion: {
        marginTop: '30px',
        fontSize: '16px',
    },
    footer: {
        textAlign: 'center',
        marginTop: '40px',
        fontSize: '14px',
        color: '#888',
    },
};

export default GuideLines;
