import React, { useState } from 'react';
import SignUp from '../components/SignUpForm';

function HomePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phonenumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // Handle form submission, e.g., send data to server or show a message
        console.log('Form submitted:', formData);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Empowering Women through education and mentorship.</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="phone"
                        id="phone"
                        name="phone"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>Sign Up</button>
            </form>
        </div>
    );
}

export default HomePage;
