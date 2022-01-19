import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Popup = ({
  title,
  content,
  handleClose,
  open,
  addFunction,
  children,
}: {
  title: string;
  content: string | {};
  handleClose: () => void;
  open: boolean;
  addFunction: () => void;
  children: any
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button className="green" onClick={addFunction}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
