import React from 'react';

const SortOptions = ({ sortOption, setSortOption }) => {
    return (
        <div>
            <span style={{color:"white"}}>Sort by:</ span>
        <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
        >
            <option value="date">Creation Date</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="company">Company</option>
        </select>
        </div>
    );
};

export default SortOptions;
