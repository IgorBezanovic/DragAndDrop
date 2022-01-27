import TextField from "@mui/material/TextField";
import Dialog from "../../../common/Dialog/dialog";
import { Training } from "../../../types/training.model";

const AddExtraTraining = ({
  title,
  content,
  handleClose,
  open,
  addTraining,
  handleChange,
  newTraining
}: {
  title: string;
  content: string;
  handleClose: () => void;
  open: boolean;
  addTraining: () => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field: keyof Training) => void;
  newTraining: Training
}) => (
  <Dialog
    title={title}
    content={content}
    handleClose={handleClose}
    open={open}
    addFunction={addTraining}
  >
    <label className="radio-label">
      Today
      <input
        type="radio"
        value="d1"
        className="radio-button"
        onChange={(e) => handleChange(e, "day")}
        checked={newTraining.day === "d1"}
      />
    </label>
    <label className="radio-label">
      Tomorrow
      <input
        type="radio"
        value="d2"
        className="radio-button"
        onChange={(e) => handleChange(e, "day")}
        checked={newTraining.day === "d2"}
      />
    </label>
    <TextField
      margin="dense"
      id="startHours"
      label="Enter the start time?"
      type="text"
      fullWidth
      variant="standard"
      onChange={(e) => handleChange(e, "startHours")}
      value={newTraining.startHours}
    />
    <TextField
      margin="dense"
      id="freeSpace"
      label="Enter the number of free space ?"
      type="number"
      fullWidth
      variant="standard"
      onChange={(e) => handleChange(e, "freeSpace")}
      value={newTraining.freeSpace}
    />
  </Dialog>
);
export default AddExtraTraining;
