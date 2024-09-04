
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import jobSlice from '../state/jobSlice'; // adjust path as needed
import JobBoard from '../components/JobBoard';
import { getJobs } from '../state/jobSlice';

// Mock the getJobs action
jest.mock('../state/jobSlice', () => ({
    getJobs: jest.fn(),
    __esModule: true,
}));

describe('JobBoard Component', () => {
    let store;
    const mockDispatch = jest.fn();
    
    beforeEach(() => {
        store = configureStore({
            reducer: {
                jobs: jobSlice.reducer,
            },
            preloadedState: {
                jobs: {
                    jobs: [
                        { id: 1, name: 'Software Engineer', created_at: '2024-01-01', tags: [{ name: 'category', value: 'Software engineering' }] },
                        { id: 2, name: 'Data Scientist', created_at: '2024-01-02', tags: [{ name: 'category', value: 'AI / Research & Development' }] }
                    ],
                    loading: false,
                    error: null
                }
            }
        });

        jest.spyOn(store, 'dispatch').mockImplementation(mockDispatch);
    });

    test('renders JobBoard component', () => {
        render(
            <Provider store={store}>
                <JobBoard />
            </Provider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('displays jobs correctly', async () => {
        render(
            <Provider store={store}>
                <JobBoard />
            </Provider>
        );

        // Check if job names are displayed
        expect(screen.getByText('Software Engineer')).toBeInTheDocument();
        expect(screen.getByText('Data Scientist')).toBeInTheDocument();
    });

    test('filters jobs by search term', async () => {
        render(
            <Provider store={store}>
                <JobBoard />
            </Provider>
        );

        // Simulate typing in the search bar
        fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'Data Scientist' } });

        // Wait for the filtering to take effect
        await waitFor(() => {
            expect(screen.queryByText('Software Engineer')).not.toBeInTheDocument();
            // expect(screen.getByText('Data Scientist')).toBeInTheDocument();
        });
    });

    test('filters jobs by category', async () => {
        render(
            <Provider store={store}>
                <JobBoard />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'AI / Research & Development' } });

        await waitFor(() => {
            expect(screen.queryByText('Software Engineer')).not.toBeInTheDocument();
        });
    });

    test('sorts jobs by option', async () => {
        render(
            <Provider store={store}>
                <JobBoard />
            </Provider>
        );

        // Simulate selecting a sort option
        fireEvent.change(screen.getByLabelText('Sort By'), { target: { value: 'name' } });

        // Check if jobs are sorted by name
        const jobNames = screen.getAllByRole('listitem').map(item => item.textContent);
        expect(jobNames[0]).toBe('Data Scientist');
        expect(jobNames[1]).toBe('Software Engineer');
    });

    test('resets filters', async () => {
        render(
            <Provider store={store}>
                <JobBoard />
            </Provider>
        );

        // Apply some filters
        fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'Data Scientist' } });
        fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'AI / Research & Development' } });

        // Reset filters
        fireEvent.click(screen.getByText('Reset Filters'));

        // Wait for the reset to take effect
        await waitFor(() => {
            expect(screen.getByText('Software Engineer')).toBeInTheDocument();
        });
    });

    test('handles loading and error states', () => {
        store = configureStore({
            reducer: {
                jobs: jobSlice.reducer,
            },
            preloadedState: {
                jobs: {
                    jobs: [],
                    loading: true,
                    error: null
                }
            }
        });

        render(
            <Provider store={store}>
                <JobBoard />
            </Provider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('handles error state', () => {
        store = configureStore({
            reducer: {
                jobs: jobSlice.reducer,
            },
            preloadedState: {
                jobs: {
                    jobs: [],
                    loading: false,
                    error: 'Error loading jobs'
                }
            }
        });

        render(
            <Provider store={store}>
                <JobBoard />
            </Provider>
        );

        expect(screen.getByText('Error loading jobs: Error loading jobs')).toBeInTheDocument();
    });
});
