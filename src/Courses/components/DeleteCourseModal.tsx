import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

interface DeleteCourseModalProps {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({ open, onCancel, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <p>Are you sure you want to delete this course?</p>
                <Button variant="contained" color="primary" onClick={onConfirm} style={{margin: "1rem"}}>
                    Confirm Delete
                </Button>
                <Button variant="contained" color="secondary" onClick={onCancel} style={{margin: "1rem"}}>
                    Cancel
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteCourseModal;