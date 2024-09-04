import React, { useState, useEffect } from 'react';

const Donations = () => {
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [donations, setDonations] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch donations from the server
    const fetchDonations = async () => {
        try {
            const response = await fetchDonations('http://localhost:5050/donation');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDonations(data);
        } catch (error) {
            //setError('Failed to fetch donations.');
            console.error('Error fetching donation:', error);
        }
    };

    // Fetch donations on component mount
    useEffect(() => {
        fetchDonations();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (amount <= 0) {
            setError('Amount must be greater than 0');
            return;
        
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5050/donation', {
                method: editId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    donor_name: name,
                    amount,
                    payment_method: paymentMethod,
                    // Include ID for updates
                    ...(editId && { id: editId }), 
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('Donation successful!');
            setAmount('');
            setName('');
            setPaymentMethod('');
            setEditId(null);
            // Refresh the donations list
            fetchDonations(); 
        } catch (error) {
            setError('There was a problem with your donation. Please try again.');
            console.error('Error making donation:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (donation) => {
        setName(donation.donor_name);
        setAmount(donation.amount);
        setPaymentMethod(donation.payment_method);
        setEditId(donation.id);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5050/donation/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Donation deleted successfully!');
            fetchDonations(); 
            // Refresh the donations list
        } catch (error) {
            setError('There was a problem deleting the donation. Please try again.');
            console.error('Error deleting donation:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Donations</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        // Minimum value for amount
                        min="0.01" 
                    />
                </label>
                <label>
                    Payment Method:
                    <input
                        type="text"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : editId ? 'Update Donation' : 'Donate'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <h3>Donation List</h3>
            <ul>
                {donations.map(donation => (
                    <li key={donation.id}>
                        <span>{donation.donor_name} donated ${donation.amount} using {donation.payment_method}</span>
                        <button onClick={() => handleEdit(donation)}>Edit</button>
                        <button onClick={() => handleDelete(donation.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Donations;
