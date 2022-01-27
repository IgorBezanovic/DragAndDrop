import { User } from "../../../types/user.model";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableRowSingle = ({
  user,
  editTraining,
  editPassword,
  deleteUser,
}: {
  user: User;
  editTraining: (userId: string) => void;
  editPassword: (userId: string) => void;
  deleteUser: (userId: string) => void;
}) => (
  <StyledTableRow>
    <StyledTableCell component="th" scope="row">
      {user.id.length > 4 ? user.id.slice(0, -32) + "..." : user.id}
    </StyledTableCell>
    <StyledTableCell align="right">{user.username}</StyledTableCell>
    <StyledTableCell align="right">{user.lastName}</StyledTableCell>
    <StyledTableCell align="right">{user.password}</StyledTableCell>
    <StyledTableCell align="right">{user.numTrainings}</StyledTableCell>
    <StyledTableCell align="right">
      <Button
        variant="outlined"
        color="success"
        startIcon={<AddIcon />}
        onClick={() => editTraining(user.id)}
      >
        Num Trainings
      </Button>
    </StyledTableCell>
    <StyledTableCell align="right">
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<EditIcon />}
        onClick={() => editPassword(user.id)}
      >
        Password
      </Button>
    </StyledTableCell>
    <StyledTableCell align="right">
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => deleteUser(user.id)}
      >
        User
      </Button>
    </StyledTableCell>
  </StyledTableRow>
);
export default TableRowSingle;
