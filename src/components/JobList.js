import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const JobList = ({ jobs }) => {
    const [jobList, setJobList] = useState(jobs);

    useEffect(() => {
        setJobList(jobs);
    }, [jobs]);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const updatedJobList = Array.from(jobList);
        const [movedJob] = updatedJobList.splice(result.source.index, 1);
        updatedJobList.splice(result.destination.index, 0, movedJob);
        setJobList(updatedJobList);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="jobs">
                {(provided) => (
                    <div
                        className="job-list"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {jobList.length === 0 ? (
                            <p>No jobs available at the moment.</p>
                        ) : (
                            jobList.map((job, index) => (
                                <Draggable key={job.id} draggableId={String(job.id)} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <JobCard job={job} />
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default JobList;
