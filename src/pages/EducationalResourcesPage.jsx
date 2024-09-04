import React, { useState, useEffect } from 'react';

const EducationalResources = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5050/resources')
            .then(response => response.json())
            .then(data => setResources(data))
            .catch(error => console.error('Error fetching resources:', error));
    }, []);

    return (
        <div>
            <h2>Educational Resources</h2>
            <ul>
                {resources.map(resource => (
                    <li key={resource.id}>
                        <a href={resource.link}>{resource.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EducationalResources;
