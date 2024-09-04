// src/components/DonationForm.js
import React, { useState } from 'react';

const DonationForm = () => {
    const [donorName, setDonorName] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const donationData = {
            donorName,
            amount,
            paymentMethod,
            date
        };

        try {
            const response = await fetch('/api/donation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(donationData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setSuccess('Donation created successfully!');
            setDonorName('');
            setAmount('');
            setPaymentMethod('');
            setDate('');
            setError('');
        } catch (err) {
            setError('Failed to create donation.');
            console.error('Error creating donation:', err);
        }
    };

    return (
        <div>
            <h2>Make a Donation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="donorName">Donor Name:</label>
                    <input
                        type="text"
                        id="donorName"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="paymentMethod">Payment Method:</label>
                    <input
                        type="text"
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default DonationForm;
