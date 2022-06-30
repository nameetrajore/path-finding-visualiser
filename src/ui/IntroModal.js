import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepButton from "@mui/material/StepButton";
import { Grid } from "@mui/material";
import image from "../resources/IMG_1572.jpg";
import image2 from "../resources/IMG_1573.jpg";
import image3 from "../resources/IMG_1575.jpg";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function preloadImage(url) {
  var img = new Image();
  img.src = url;
}

const steps = ["", "", ""];

export default function BasicModal() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    handleClose();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const Step1 = (
    <Grid
      sx={{
        
        m: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {" "}
      <Typography variant="h3" fontWeight={500} mb={2}>
        Welcome to Path Finding Visualiser!
      </Typography>
      <Typography variant="body1" fontWeight={400}>
        This is a tutorial of all the features of the application. You are free
        to skip this and dive right in!
      </Typography>
      <Box
        component="img"
        sx={{
          maxHeight: 200,
        }}
        alt="The house from the offer."
        src={image}
      ></Box>
    </Grid>
  );

  const Step2 = (
    <Grid
      sx={{
        
        m: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        maxWidth:'900px'
      }}
    >
      {" "}
      <Typography variant="h4" fontWeight={500} mb={2}>
        What is a path finding algorithm?
      </Typography>
      <Typography variant="body1" fontWeight={400}>
        A path finding algorithm in layman terms is a step-by-step process where
        we start from a point (source) and look for the end-point (destination).
        To carry out this step-by-step process we have different types of
        algorithms some of which are very efficient but others, not so much.
      </Typography>
      <Box
        component="img"
        sx={{
          maxHeight: 200,
        }}
        alt="The house from the offer."
        src={image2}
      ></Box>
    </Grid>
  );

  const Step3 = (
    <Grid
      sx={{
        
        m: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {" "}
      <Typography variant="h4" fontWeight={500} mb={2}>
        Features
      </Typography>
      <Grid m={2}>
        <Typography variant="body1" fontWeight={400}>
          1. Choose your own algorithm
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          2. Choose start and end points
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          3. Set walls anywhere you like
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          4. Drag and drop different weights
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          5. Set your own animation speed
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          6. Generate a random weight and wall maze
        </Typography>
      </Grid>
      <Box
        component="img"
        sx={{
          maxHeight: 200,
        }}
        alt="The house from the offer."
        src={image3}
      ></Box>
    </Grid>
  );

  React.useEffect(() => {
    handleOpen();
    preloadImage(image);
    preloadImage(image2);
    preloadImage(image3);
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {!activeStep && Step1}
                  {!(activeStep - 1) && Step2}
                  {!(activeStep - 2) && Step3}

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button onClick={handleComplete} color="inherit">
                      Skip
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    {!!(activeStep - 2) && (
                      <Button onClick={handleNext} sx={{ mr: 1 }}>
                        Next
                      </Button>
                    )}
                    {!(activeStep - 2) && (
                      <Button onClick={handleClose} sx={{ mr: 1 }}>
                        Finish
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
