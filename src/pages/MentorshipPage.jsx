import React, { useState, useEffect } from 'react';

const Mentor = () => {
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5050/mentorship')
            .then(response => response.json())
            .then(data => setMentors(data))
            .catch(error => console.error('Error fetching mentors:', error));
    }, []);

    return (
        <div>
            <h2>Mentorship</h2>
            <ul>
                {mentors.map(mentor => (
                    <li key={mentor.id}>
                        <h3>{mentor.name}</h3>
                        <p>{mentor.expertise}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Mentor;
