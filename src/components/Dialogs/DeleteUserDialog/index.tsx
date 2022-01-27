import Dialog from "../../../common/Dialog/dialog";

const DeleteUserDialog = ({
  title,
  content,
  handleClose,
  open,
  deleteUser,
}: {
  title: string;
  content: string;
  handleClose: () => void;
  open: boolean;
  deleteUser: () => void;
}) => (
  <Dialog
    title={title}
    content={content}
    handleClose={handleClose}
    open={open}
    addFunction={deleteUser}
  >
    <br></br>
    <p>
      <strong>Are you sure you want to delete the user?</strong>
    </p>
  </Dialog>
);
export default DeleteUserDialog;
