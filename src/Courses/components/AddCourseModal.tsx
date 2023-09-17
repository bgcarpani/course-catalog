import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    MenuItem,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Grid,
} from '@mui/material';
import { Professor, Room } from '../types';
import swal from 'sweetalert';
import API_BASE_URL from '../../consts/apiurl';

const AddCourseModal = ({ handleGetCourses, open, onClose, selectedCourseForUpdate }: any) => {
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [professorId, setProfessor] = useState(0);
    const [roomId, setRoom] = useState(0);
    const [roomsList, setRoomsList] = useState<Room[]>([]);
    const [professorsList, setProfessorsList] = useState<Professor[]>([]);
    const [isSubmittable, setIsSubmittable] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const [daysOfWeek, setDaysOfWeek] = useState<{
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    }>({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    });
    
    const getProfessors = async () => {
        fetch(`${API_BASE_URL}/Professors/GetProfessors`)
        .then((response) => response.json())
        .then((data) => setProfessorsList(data))
        .catch((error) => console.error('Error fetching courses: ', error));
    }

    const getRooms = async () => {
        fetch(`${API_BASE_URL}/Rooms/GetRooms`)
        .then((response) => response.json())
        .then((data) => setRoomsList(data))
        .catch((error) => console.error('Error fetching courses: ', error));
    }

    useEffect(() => {
        setIsSubmittable(courseName.trim() !== '');
    }, [courseName]); 

    useEffect(() => {
        if (open) {
            getProfessors();
            getRooms();
        }
    }, [open]);

    useEffect(() => {
        if (selectedCourseForUpdate) {
            setIsUpdate(true);
            setCourseId(selectedCourseForUpdate.courseId || '');
            setCourseName(selectedCourseForUpdate.courseName || '');
            setProfessor(selectedCourseForUpdate.professorId || 0);
            setRoom(selectedCourseForUpdate.roomId || 0);
            setDaysOfWeek({
                monday: selectedCourseForUpdate.monday || false,
                tuesday: selectedCourseForUpdate.tuesday || false,
                wednesday: selectedCourseForUpdate.wednesday || false,
                thursday: selectedCourseForUpdate.thursday || false,
                friday: selectedCourseForUpdate.friday || false,
                saturday: selectedCourseForUpdate.saturday || false,
                sunday: selectedCourseForUpdate.sunday || false,
            });
        } else {
            clearControls();
        }
    }, [selectedCourseForUpdate]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDaysOfWeek({
        ...daysOfWeek,
        [event.target.name]: event.target.checked,
        });
    };
    
    const clearControls = () => {
        setCourseName("");
        setDaysOfWeek({
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        });
        setIsSubmittable(false);
        setProfessor(0);
        setRoom(0);
        setIsUpdate(false);
    };

    const handleSubmit = () => {
        const selectedDaysOfWeek = Object.keys(daysOfWeek).reduce(
            (acc, day) => ({
                ...acc,
                [day]: daysOfWeek[day as keyof typeof daysOfWeek],
            }),
            {}
        );

        const hasCheckboxSelected = Object.values(selectedDaysOfWeek).some(
            (value) => value === true
        );
    
        if (!hasCheckboxSelected) {
            swal({
                className: "secondary-font",
                text: "Please select at least one checkbox.",
                icon: "error",
            });
            return;
        }
        
        const roomIdValue = roomId === 0 ? null : roomId;
        const professorIdValue = professorId === 0 ? null : professorId;

        if (!isUpdate)
        {
            const courseData = {
                courseName,
                professorId: professorIdValue,
                roomId: roomIdValue,
                ...selectedDaysOfWeek,
            };

            fetch(`${API_BASE_URL}/Courses/CreateCourse`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            })
                .then((response) => {
                if (response.ok) {
                    swal({
                        className: "secondary-font",
                        text: "Course successfully created!",
                        icon: "success",
                    });
                    handleGetCourses();
                }
                })
                .catch((error) => {
                    swal({
                        className: "secondary-font",
                        text: error,
                        icon: "error",
                    });
                });
        }else{
            const courseData = {
                courseId,
                courseName,
                professorId: professorIdValue,
                roomId: roomIdValue,
                ...selectedDaysOfWeek,
            };

            fetch(`${API_BASE_URL}/Courses/UpdateCourse`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            })
                .then((response) => {
                if (response.ok) {
                    swal({
                        className: "secondary-font",
                        text: "Course successfully updated!",
                        icon: "success",
                    });
                    handleGetCourses();
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
        
        clearControls();
        onClose();
    };

    const handleCancel = () => {
        clearControls();
        onClose();
    };


    const handleProfessorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedId = event.target.value as number;
        if (professorsList.some((professor) => professor.professorId === selectedId)) {
            setProfessor(selectedId);
        }
    };
    
    const handleRoomChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedId = event.target.value as number;
        if (roomsList.some((room) => room.roomId === selectedId)) {
            setRoom(selectedId);
        }
    };

return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New Course</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                        label="Course Name"
                        fullWidth
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        style={{margin: "1rem"}}
                        />
                        <TextField
                        select
                        label="Professor"
                        fullWidth
                        value={professorId}
                        onChange={handleProfessorChange}
                        style={{ margin: "1rem" }}
                        >
                        <MenuItem value={0} disabled>Select one option...</MenuItem>
                        {professorsList.map((professor) => (
                            <MenuItem key={professor.professorId} value={professor.professorId}>
                            {professor.professorName}
                            </MenuItem>
                        ))}
                        </TextField>
                        <TextField
                        select
                        label="Room"
                        fullWidth
                        value={roomId}
                        onChange={handleRoomChange}
                        style={{ margin: "1rem" }}
                        >
                        <MenuItem value={0} disabled>Select one option...</MenuItem>
                        {roomsList.map((room) => (
                            <MenuItem key={room.roomId} value={room.roomId}>
                            {room.roomNumber}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6} style={{paddingLeft: "4rem"}}>
                        <FormGroup>
                        {Object.keys(daysOfWeek).map((day) => (
                            <FormControlLabel
                            key={day}
                            control={
                                <Checkbox
                                checked={daysOfWeek[day as keyof typeof daysOfWeek]}
                                onChange={handleCheckboxChange}
                                name={day}
                                />
                            }
                            label={day.charAt(0).toUpperCase() + day.slice(1)}
                            />
                        ))}
                        </FormGroup>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!isSubmittable}>
                Add Course
                </Button>
                <Button variant="contained" color="secondary" style={{margin: "1rem"}} onClick={handleCancel}>
                    CANCEL
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default AddCourseModal;