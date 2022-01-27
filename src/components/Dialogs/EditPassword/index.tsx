import TextField from "@mui/material/TextField";
import Dialog from "../../../common/Dialog/dialog";
import { Values } from "../../../types/values.model";

const EditPassword = ({
  title,
  content,
  handleClose,
  open,
  addTraining,
  handleChangeUser,
  user
}: {
  title: string;
  content: string;
  handleClose: () => void;
  open: boolean;
  addTraining: () => void;
  handleChangeUser: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field: keyof Values) => void;
  user: Values;
}) => (
  <Dialog
    title={title}
    content={content}
    handleClose={handleClose}
    open={open}
    addFunction={addTraining}
  >
    <TextField
      margin="dense"
      id="username"
      label="Enter a Name of user:"
      type="text"
      fullWidth
      variant="standard"
      onChange={(e) => handleChangeUser(e, "username")}
      value={user.username}
    />
    <TextField
      margin="dense"
      id="newPassword"
      label="Enter the new password:"
      type="text"
      fullWidth
      variant="standard"
      onChange={(e) => handleChangeUser(e, "newPassword")}
      value={user.newPassword}
    />
    <TextField
      margin="dense"
      id="repeatPassword"
      label="Repeat the new password:"
      type="text"
      fullWidth
      variant="standard"
      onChange={(e) => handleChangeUser(e, "repeatPassword")}
      value={user.repeatPassword}
    />
  </Dialog>
);
export default EditPassword;
