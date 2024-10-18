import React from 'react';

const UserList = () => {



    const users = [
        {
            name: 'John Doe',
            username: 'johndoe',
            gender: 'Male',
            address: '123 Main St',
            birthday: '1990-01-01',
            identifyNumber: '123456789',
            phoneNumber: '555-1234',
        },
        {
            name: 'Jane Smith',
            username: 'janesmith',
            gender: 'Female',
            address: '456 Oak St',
            birthday: '1985-05-05',
            identifyNumber: '987654321',
            phoneNumber: '555-5678',
        },
        // Add more users as needed
    ];

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
        },
        th: {
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            textAlign: 'left',
            fontWeight: 'bold',
        },
        td: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
        row: {
            backgroundColor: '#fff',
        },
        rowAlt: {
            backgroundColor: '#f1f1f1',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>User List</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Username</th>
                        <th style={styles.th}>Gender</th>
                        <th style={styles.th}>Address</th>
                        <th style={styles.th}>Birthday</th>
                        <th style={styles.th}>Identify Number</th>
                        <th style={styles.th}>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.username} style={index % 2 === 0 ? styles.row : styles.rowAlt}>
                            <td style={styles.td}>{user.name}</td>
                            <td style={styles.td}>{user.username}</td>
                            <td style={styles.td}>{user.gender}</td>
                            <td style={styles.td}>{user.address}</td>
                            <td style={styles.td}>{user.birthday}</td>
                            <td style={styles.td}>{user.identifyNumber}</td>
                            <td style={styles.td}>{user.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
