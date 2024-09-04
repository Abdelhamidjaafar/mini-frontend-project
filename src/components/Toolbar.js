import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import SortOptions from './SortOptions';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Toolbar = ({
    searchTerm,
    setSearchTerm,
    categories,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    resetFilters
}) => {


    useEffect(() => {
        const savedSearchTerm = localStorage.getItem('searchTerm');
        const savedCategory = localStorage.getItem('selectedCategory');
        const savedSortOption = localStorage.getItem('sortOption');

        if (savedSearchTerm) setSearchTerm(savedSearchTerm);
        if (savedCategory) setSelectedCategory(savedCategory);
        if (savedSortOption) setSortOption(savedSortOption);
    }, [setSearchTerm, setSelectedCategory, setSortOption]);


    useEffect(() => {
        localStorage.setItem('searchTerm', searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        localStorage.setItem('selectedCategory', selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        localStorage.setItem('sortOption', sortOption);
    }, [sortOption]);

    return (
        <div className="toolbar">
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <Tippy content={selectedCategory === "" ? "All Categories" : selectedCategory}>
                <div>
                    <FilterDropdown
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>
            </Tippy>
            <Tippy content={`Sort by ${sortOption}`}>
                <div>
                    <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
                </div>
            </Tippy>
            <Tippy content="Reset Filters">
                <div>
                    <button
                        onClick={() => {
                            resetFilters();
                            localStorage.removeItem('searchTerm');
                            localStorage.removeItem('selectedCategory');
                            localStorage.removeItem('sortOption');
                        }}
                    >
                        Reset Filters
                    </button></div>
            </Tippy>

        </div>
    );
};

export default Toolbar;
