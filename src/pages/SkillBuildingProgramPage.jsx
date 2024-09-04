import React, { useState, useEffect } from 'react';

const SkillBuildingPrograms = () => {
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5050/api/programs')
            .then(response => response.json())
            .then(data => setPrograms(data))
            .catch(error => console.error('Error fetching programs:', error));
    }, []);

    return (
        <div>
            <h2>Skill Building Programs</h2>
            <ul>
                {programs.map(program => (
                    <li key={program.id}>
                        <h3>{program.name}</h3>
                        <p>{program.description}</p>
                        <p>Instructor: {program.instructor}</p>
                        <p>Location: {program.location}</p>
                        <p>Schedule: {new Date(program.schedule).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SkillBuildingPrograms;
