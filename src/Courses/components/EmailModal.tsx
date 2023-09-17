import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    TextField,
    Grid,
} from '@mui/material';
import swal from 'sweetalert';
import API_BASE_URL from '../../consts/apiurl';

interface EmailModalProps {
    open: boolean;
    onClose: () => void;
    professorEmail: string;
}

const EmailModal: React.FC<EmailModalProps> = ({ open, onClose, professorEmail }) => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {

        const emailData = {
            toAddress: professorEmail,
            subject: subject,
            message: message,
        };

        fetch(`${API_BASE_URL}/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        })
            .then((response) => {
                if (response.ok) {
                    swal({
                        className: "secondary-font",
                        text: "Course successfully created!",
                        icon: "success",
                    });
                } else {
                    swal({
                        className: "secondary-font",
                        text: "Failed to send email.",
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
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Send email to: </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} style={{ paddingTop: '1rem' }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Professor's Email"
                            fullWidth
                            variant="outlined"
                            value={professorEmail}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Subject"
                            fullWidth
                            variant="outlined"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Message"
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                        >
                            Send
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="contained"
                            color="secondary"
                            style={{ marginLeft: '1rem' }}
                        >
                            Close
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default EmailModal;
