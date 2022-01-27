import Dialog from "../../../common/Dialog/dialog";

const LogoutDialog = ({
  title,
  content,
  handleClose,
  open,
  addTraining,
}: {
  title: string;
  content: string;
  handleClose: () => void;
  open: boolean;
  addTraining: () => void;
}) => (
  <Dialog
    title={title}
    content={content}
    handleClose={handleClose}
    open={open}
    addFunction={addTraining}
  >
      <br></br>
      <p><strong>Da li ste sigurni da zelite da se izlogujete?</strong></p>
 </Dialog>
);
export default LogoutDialog;
