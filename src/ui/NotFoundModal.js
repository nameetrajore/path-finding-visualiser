import React from 'react'
import { Modal, Box, Typography, Button, Fade } from '@mui/material'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    zoom:'80%'
  };

const NotFoundModal = (props) => {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        props.setNotFound(false);
      };
  return (
    <Modal
        open={props.notFound}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={props.notFound}>
        <Box sx={style}>
        <Typography variant='h4' sx={{my:1}}>
            Destination not found :(
        </Typography>
        <Typography variant='body1'>
        Keep playing!
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button sx={{ mr:'auto'}} onClick={handleClose}>
            Okay
        </Button>
        </Box>
        </Box>
        </Fade>
      </Modal>
  )
}

export default NotFoundModal