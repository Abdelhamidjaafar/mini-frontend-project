/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../state/jobSlice';
import JobList from '../components/JobList';
import Toolbar from '../components/Toolbar';
import Pagination from '../components/Pagination';

const JobBoard = () => {
    const dispatch = useDispatch();
    const { jobs, loading, error } = useSelector((state) => state.jobs);
    const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('searchTerm') || '');
    const [selectedCategory, setSelectedCategory] = useState(() => localStorage.getItem('selectedCategory') || '');
    const [sortOption, setSortOption] = useState(() => localStorage.getItem('sortOption') || 'date');
    const [sortDirection, setSortDirection] = useState(() => localStorage.getItem('sortDirection') === 'asc' ? 'asc' : 'desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage, setJobsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        dispatch(getJobs());
    }, [dispatch]);

    const filteredJobs = jobs.length === 0 ? [] : jobs?.jobs
        .filter(job => job?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(job => (selectedCategory === '' || job?.tags?.some(tag => tag.name === 'category' && tag.value.toLowerCase() === selectedCategory.toLowerCase())))
        .sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
            const dateB = b.created_at ? new Date(b.created_at) : new Date(0);

            let comparison =0;
            switch (sortOption.toLowerCase()) {
                case 'date':
                    comparison = dateB - dateA;
                    break;
                case 'name':
                    comparison = (a.name || '').localeCompare(b.name || '');
                    break;
                case 'category':
                    comparison = (a.tags?.find(tag => tag.name === 'category')?.value || '')
                        .localeCompare(b.tags?.find(tag => tag.name === 'category')?.value || '');
                    break;
                case 'company':
                    comparison = (a.tags?.find(tag => tag.name === 'company')?.value || '')
                        .localeCompare(b.tags?.find(tag => tag.name === 'company')?.value || '');
                    break;
                default:
                    comparison = 0;
            }

            return sortDirection === 'asc' ? comparison : -comparison; 
        });

    useEffect(() => {
        const calculatedTotalPages = Math.ceil(filteredJobs.length / jobsPerPage);
        setTotalPages(calculatedTotalPages);

        if (currentPage > calculatedTotalPages) {
            setCurrentPage(1);
        }
    }, [filteredJobs, jobsPerPage, currentPage]);

    const displayedJobs = filteredJobs?.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSortOption('date');
        setSortDirection('asc');
        setCurrentPage(1);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading jobs: {error}</p>;

    return (
        <div className="job-board">
            <Toolbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categories={['AI / Research & Development', 'Artificial intelligence', 'Financial Services', 'Human Resources', 'Software engineering']}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortOption={sortOption}
                setSortOption={setSortOption}
                sortDirection={sortDirection} 
                setSortDirection={setSortDirection} 
                resetFilters={resetFilters}
            />
            <JobList jobs={displayedJobs} />
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                jobsPerPage={jobsPerPage}
                setJobsPerPage={setJobsPerPage}
            />
        </div>
    );
};

export default JobBoard;
