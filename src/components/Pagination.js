import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, totalPages, jobsPerPage, setJobsPerPage }) => {
    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="pagination">
                {currentPage !== 1 && <button onClick={handlePrevious} disabled={currentPage === 1}>
                    Previous
                </button>}
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            
                {currentPage !== totalPages && <button onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </button>}
            <div className="jobsPerPage">
                <select
                    onChange={(e) => setJobsPerPage(e.target.value)}
                    value={jobsPerPage}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
        </div >
    );
};

export default Pagination;
