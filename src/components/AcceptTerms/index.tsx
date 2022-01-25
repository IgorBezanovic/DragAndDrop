import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

const BoxAccept = ({
  buttonSx,
  handleButtonClick,
  success,
  loading,
}: {
  buttonSx: any;
  handleButtonClick: () => void;
  success: boolean;
  loading: boolean;
}) => (
  <Box
    sx={{ display: "flex", alignItems: "center" }}
    style={{ margin: "15px 0 20px" }}
  >
    <Box sx={{ m: 1, position: "relative" }}>
      <Fab
        aria-label="save"
        color="primary"
        sx={buttonSx}
        onClick={handleButtonClick}
      >
        {success ? <CheckIcon /> : <SaveIcon />}
      </Fab>
      {loading && (
        <CircularProgress
          size={68}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
    <Box sx={{ m: 1, position: "relative" }}>
      <Button
        variant="contained"
        sx={buttonSx}
        disabled={loading}
        onClick={handleButtonClick}
      >
        Accept terms and conditions
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  </Box>
);

export default BoxAccept;
