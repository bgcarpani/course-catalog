import React, { useState } from 'react';
import { Course } from '../types';
import { Box, Menu, MenuItem, IconButton, Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CourseDetailsModal from './CourseDetailsModal';
import DeleteCourseModal from './DeleteCourseModal';
import swal from 'sweetalert';
import EmailModal from './EmailModal';

interface CourseGridProps {
    courses: Course[];
    onUpdate: (course: Course) => void;
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses, onUpdate }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);
    const [professorEmail, setProfessorEmail] = useState<string>('');
    
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, course: Course) => {
        setAnchorEl(event.currentTarget);
        setSelectedCourse(course);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setSelectedCourse(null);
    };

    const handleUpdate = () => {
        if (selectedCourse) {
            onUpdate(selectedCourse);
        }
        setAnchorEl(null);
    };

    const handleDelete = () => {
        setAnchorEl(null);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedCourse) {
            const courseId = selectedCourse.courseId;
            
            fetch(`https://localhost:7002/api/Courses/DeleteCourse?id=${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        swal({
                            className: "secondary-font",
                            text: "Course successfully deleted!",
                            icon: "success",
                        });
                    } else {
                        swal({
                            className: "secondary-font",
                            text: "The course couldn't be deleted.",
                            icon: "error",
                        });
                    }
                })
                .catch((error) => {
                    swal({
                        className: "secondary-font",
                        text: error,
                        icon: "error",
                    });
                });
        }
        setDeleteModalOpen(false);
        setSelectedCourse(null);
    };

    const handleDetails = () => {
        setDetailsModalOpen(true);
        setAnchorEl(null);
    };

    const handleOpenEmailModal = (professorEmail: string) => {
        setProfessorEmail(professorEmail);
        setEmailModalOpen(true);
    };
    
    const columns: GridColDef[] = [
        { field: 'courseId', headerName: 'ID', width: 90 },
        { field: 'courseName', headerName: 'Course Name', width: 200 },
        {
            field: 'professorName',
            headerName: 'Professor',
            width: 200,
            renderCell: (params: GridRenderCellParams) => {
                const professorEmail = params.row.professorEmail || '';
                return (
                    <div>
                        {professorEmail != "TBD" ? (
                            <Button onClick={() => handleOpenEmailModal(professorEmail)}>
                                {params.value}
                            </Button>
                        ) : (
                            params.value
                        )}
                    </div>
                );
            },
        },
        { field: 'roomNumber', headerName: 'Room Number', width: 150 },
        { field: 'empty', headerName: '', width: 500 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                <div>
                    <IconButton
                        aria-label="actions"
                        onClick={(e) => handleOpenMenu(e, params.row as Course)}
                    >
                        &#8285;
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={handleUpdate}>Update</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        <MenuItem onClick={handleDetails}>Details</MenuItem>
                    </Menu>
                </div>
            ),
        },
    ];

    const coursesRows = courses.map(course => ({
        id: course.courseId.toString(),
        ...course
    }));
    
    return (
        <Box sx={{ height: 400, width: '80%' }}>
        <DataGrid
            rows={coursesRows}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 5,
                },
            },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
        />
            <CourseDetailsModal
                open={isDetailsModalOpen}
                onClose={() => setDetailsModalOpen(false)}
                selectedCourse={selectedCourse}
            />
            <DeleteCourseModal
                open={isDeleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            <EmailModal
                open={isEmailModalOpen}
                onClose={() => setEmailModalOpen(false)}
                professorEmail={professorEmail}
            />
        </Box>
    );
};

export default CourseGrid;