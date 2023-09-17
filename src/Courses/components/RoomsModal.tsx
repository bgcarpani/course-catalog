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
import API_BASE_URL from '../../consts/apiurl';

const RoomsModal = ({ open, onClose, handleGetCourses }: any) => {
    const [roomNumber, setRoomNumber] = useState('');

    const clearControls = () => {
        setRoomNumber('');
    };

    const handleSubmit = () => {

        
        if (!roomNumber)
        {
            swal({
                className: "secondary-font",
                text: "Please insert the Room's number.",
                icon: "error",
            });
            return;
        }

        fetch(`${API_BASE_URL}/Rooms/CreateRoom?roomNumber=${roomNumber}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                if (response.ok) {
                    swal({
                        className: "secondary-font",
                        text: "Room successfully created!",
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
                            label="Room Number"
                            fullWidth
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            style={{ margin: '1rem', width: "90%" }}
                        />
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

export default RoomsModal;