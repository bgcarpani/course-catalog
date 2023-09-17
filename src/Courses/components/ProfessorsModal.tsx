import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Grid,
} from '@mui/material';
import swal from 'sweetalert';

const ProfessorsModal = ({ open, onClose }: any) => {
    const [professorName, setProfessorName] = useState('');
    const [professorEmail, setProfessorEmail] = useState('');

    const clearControls = () => {
        setProfessorName('');
        setProfessorEmail('');
    };

    const handleSubmit = () => {

        const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegEx.test(professorEmail)) {
            swal({
                className: "secondary-font",
                text: "Invalid email format.",
                icon: "error",
            });
            return;
        }
    
        const professorData = {
            professorName,
            professorEmail,
        };

        fetch('https://localhost:7002/api/Professors/CreateProfessor', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(professorData),
            })
                .then((response) => {
                if (response.ok) {
                    swal({
                        className: "secondary-font",
                        text: "Professor successfully created!",
                        icon: "success",
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

        clearControls();
        onClose();
    };

    const handleCancel = () => {
        clearControls();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Professor</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid>
                        <TextField
                            label="Professor's Name"
                            fullWidth
                            value={professorName}
                            onChange={(e) => setProfessorName(e.target.value)}
                            style={{ margin: '1rem' }}
                        />
                        <TextField
                            label="Professor's Email"
                            fullWidth
                            value={professorEmail}
                            onChange={(e) => setProfessorEmail(e.target.value)}
                            style={{ margin: '1rem'}}
                        />
                    </Grid>                    
                    <Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Create
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ margin: '1rem' }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default ProfessorsModal;