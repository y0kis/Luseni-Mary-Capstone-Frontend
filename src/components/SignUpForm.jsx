import React, { useState } from 'react';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phonenumber: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Replace with your API endpoint
            const response = await fetch('https://example.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setSubmitSuccess(true);
            console.log('Form submitted successfully:', result);
        } catch (error) {
            setSubmitSuccess(false);
            setError(error.message);
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Sign Up for Our Newsletter</h2>
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
                        required
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
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="phonenumber">Phone:</label>
                    <input
                        type="tel"
                        id="phonenumber"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                        required
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </button>
            </form>
            {submitSuccess !== null && (
                <div style={{ marginTop: '20px' }}>
                    {submitSuccess ? (
                        <p style={{ color: 'green' }}>Thank you for signing up!</p>
                    ) : (
                        <p style={{ color: 'red' }}>Submission failed: {error}</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SignUp;
