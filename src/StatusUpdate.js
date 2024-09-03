import axios from 'axios';
import React, { useEffect, useState } from 'react';

const styles = {
    statusUpdate: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        margin: '10px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'opacity 0.5s ease',
        opacity: 1,
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
    checkbox: {
        marginLeft: '20px',
    }
};

const StatusUpdate = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://192.168.106.29:4040/complaints');
                const complaintsData = response.data.map(complaint => ({
                    id: complaint._id, // Ensure the ID is correctly mapped
                    text: complaint.text,
                    resolved: complaint.resolved,
                }));
                setComplaints(complaintsData);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };
    
        fetchComplaints();
    }, []);    

    const handleCheckboxChange = async (index) => {
    const updatedComplaints = [...complaints];
    const complaintId = updatedComplaints[index].id; // Extract the complaint ID
    updatedComplaints[index].resolved = !updatedComplaints[index].resolved;

    try {
        // Update the complaint status in the backend with the correct resolved status
        await axios.put(`http://192.168.106.29:4040/complaints/${complaintId}`, {
            resolved: updatedComplaints[index].resolved,
        });

        setComplaints(updatedComplaints);
    } catch (error) {
        console.error('Error updating complaint status:', error);
    }
};
  

    return (
        <div style={styles.statusUpdate}>
            <h2>Status Update</h2>
            <table id="complaintsTable" style={styles.complaintsTable}>
                <thead>
                    <tr>
                        <th style={{ ...styles.complaintsTableThTd, ...styles.complaintsTableTh }}>Serial Number</th>
                        <th style={{ ...styles.complaintsTableThTd, ...styles.complaintsTableTh }}>Complaint</th>
                        <th style={{ ...styles.complaintsTableThTd, ...styles.complaintsTableTh }}>Status</th>
                        <th style={{ ...styles.complaintsTableThTd, ...styles.complaintsTableTh }}>Mark Resolved</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map((complaint, index) => (
                        <tr key={complaint.id} style={index % 2 === 0 ? styles.complaintsTableEvenRow : {}}>
                            <td style={styles.complaintsTableThTd}>{index + 1}</td> {/* Serial Number */}
                            <td style={styles.complaintsTableThTd}>{complaint.text}</td>
                            <td style={styles.complaintsTableThTd}>
                                {complaint.resolved ? 'Resolved' : 'Pending'}
                            </td>
                            <td style={styles.complaintsTableThTd}>
                                <input
                                    type="checkbox"
                                    checked={complaint.resolved}
                                    onChange={() => handleCheckboxChange(index)}
                                    style={styles.checkbox}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatusUpdate;
