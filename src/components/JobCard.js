import React, { useState } from 'react';

const JobCard = ({ job }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="job-card" onClick={() => setExpanded(!expanded)}>
            <h3>{job.name}</h3>
            <h4>Posted on:</h4><p> {new Date(job.created_at).toLocaleDateString()}</p>
            <h4>Location:</h4> <p>{job.location.text}</p>
            <h4>Job Type:</h4><p> {job.tags.find(tag => tag.name.toLowerCase() === 'type')?.value || 'N/A'}</p>
            <h4>Category:</h4><p> {job.tags.find(tag => tag.name === 'category')?.value || 'N/A'}</p>
            {expanded && (
                <div className="job-details">
                    <h4>Description:</h4><p>{job.summary===''?"No description available ":job.summary}</p>
                    <h4>Skills:</h4>
                    <ul>
                        {job.skills.map((skill, index) => (
                            <li key={index}>{skill.name}</li>
                        ))}
                    </ul>
                    <h4>Deadline :</h4> <p>{new Date(job.ranges_date[0].value_max).toLocaleDateString()}</p>
                    <h4>Environment:</h4>  <p> {job.board.environment}</p>
                </div>
            )}
        </div>
    );
};

export default JobCard;
