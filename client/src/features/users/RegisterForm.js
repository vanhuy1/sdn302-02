import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useAddNewUserMutation } from './usersApiSlice';
import { useNavigate } from "react-router-dom"

// const USER_REGEX = /^[A-z0-9]{3,20}$/
// const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/


const RegisterForm = () => {


    const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        address: '',
        gender: 'Male',
        birthDay: '',
        identifyNumber: '',
        phoneNumber: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await addNewUser(formData).unwrap()
            alert("Register successfully!")
            setFormData({
                username: '',
                password: '',
                name: '',
                address: '',
                gender: 'Male',
                birthDay: '',
                identifyNumber: '',
                phoneNumber: '',
            })
            navigate('/login')
        } catch (err) {
            console.error('Failed to register: ', err)
        }
    }

    const styles = {
        container: {
            maxWidth: '700px',
            width: '100%', // Ensure container is responsive
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        heading: {
            textAlign: 'center',
            fontSize: '28px', // Slightly larger font size for emphasis
            marginBottom: '20px',
            fontWeight: 'bold', // Make the heading bold
            letterSpacing: '1.5px', // Add some spacing between letters for a modern look
            color: '#333', // Darker shade for text color
            textTransform: 'uppercase', // Uppercase for a more striking appearance
        },
        formGroup: {
            marginBottom: '15px',
            width: '600px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        select: {
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
        },
        footer: {
            marginTop: '20px',
            textAlign: 'center',
        },
        footerLink: {
            color: '#007bff',
            textDecoration: 'none',
        },
        error: {
            color: 'red',
            textAlign: 'center',
        },
        success: {
            color: 'green',
            textAlign: 'center',
        },
    }

    return (
        <>

            <div style={styles.container}>
                <h2 style={styles.heading}>Register</h2>
                {isError && <p style={styles.error}>{error?.data?.message}</p>}
                {isSuccess && <p style={styles.success}>User added successfully!</p>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="name">Name</label>
                        <input
                            style={styles.input}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="username">Username</label>
                        <input
                            style={styles.input}
                            type="text"
                            id="username"
                            name="username"
                            autoComplete='off'
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="password">Password</label>
                        <input
                            style={styles.input}
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="gender">Gender</label>
                        <select
                            style={styles.select}
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="address">Address</label>
                        <input
                            style={styles.input}
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="birthday">Birthday</label>
                        <input
                            style={styles.input}
                            type="date"
                            id="birthday"
                            name="birthDay"
                            value={formData.birthDay}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="identifyNumber">Identify Number</label>
                        <input
                            style={styles.input}
                            type="text"
                            id="identifyNumber"
                            name="identifyNumber"
                            value={formData.identifyNumber}
                            onChange={handleChange}
                            placeholder="Enter your identify number"
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="phoneNumber">Phone Number</label>
                        <input
                            style={styles.input}
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <button style={styles.button} type="submit">Register</button>
                </form>
                <footer style={styles.footer}>
                    <Link to="/" style={styles.footerLink}>Back to Home</Link>
                </footer>
            </div>
        </>
    )
};

export default RegisterForm;
