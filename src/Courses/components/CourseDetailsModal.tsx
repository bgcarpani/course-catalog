import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormGroup, FormControlLabel, Checkbox, Grid, Button } from '@mui/material';
import { Course } from '../types';

interface CourseDetailsModalProps {
    open: boolean;
    onClose: () => void;
    selectedCourse: Course | null;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ open, onClose, selectedCourse }) => {
    
    const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleCancel = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Course Details</DialogTitle>
            <DialogContent>
                {selectedCourse && (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Course Name"
                                fullWidth
                                value={selectedCourse.courseName}
                                InputProps={{
                                    readOnly: true,
                                }}
                                style={{margin: "1rem"}}
                                disabled
                            />
                            <TextField
                                label="Professor"
                                fullWidth
                                value={selectedCourse.professorName}
                                InputProps={{
                                    readOnly: true,
                                }}
                                style={{margin: "1rem"}}
                                disabled
                            />
                            <TextField
                                label="Professor Email"
                                fullWidth
                                value={selectedCourse.professorEmail}
                                InputProps={{
                                    readOnly: true,
                                }}
                                style={{margin: "1rem"}}
                                disabled
                            />
                            <TextField
                                label="Room Number"
                                fullWidth
                                value={selectedCourse.roomNumber}
                                InputProps={{
                                    readOnly: true,
                                }}
                                style={{margin: "1rem"}}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} style={{paddingLeft: "3rem", paddingTop: "1.5rem"}}>
                        <FormGroup>
                                {dayLabels.map(day => (
                                    <FormControlLabel
                                        key={day}
                                        control={
                                            <Checkbox
                                                checked={(selectedCourse as any)[day.toLowerCase()]}
                                                disabled
                                            />
                                        }
                                        label={day}
                                    />
                                ))}
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'right', marginTop: '1rem' }}>
                            <Button variant="contained" color="secondary" onClick={handleCancel}>
                                CANCEL
                            </Button>
                        </Grid>
                    </Grid>
                    
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CourseDetailsModal;