import { User } from "../../types/user.model";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableRowSingle from "./TableRow/index";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TableAllUsers = ({
  userList,
  editTraining,
  editPassword,
  deleteUser
}: {
  userList: User[];
  editTraining: (userId: string) => void;
  editPassword: (userId: string) => void;
  deleteUser: (userId: string) => void
}) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Id</StyledTableCell>
          <StyledTableCell align="center">
            Name
          </StyledTableCell>
          <StyledTableCell align="center">Last Name</StyledTableCell>
          <StyledTableCell align="center">Password</StyledTableCell>
          <StyledTableCell align="center"># Trainings</StyledTableCell>
          <StyledTableCell align="center">Add Trainings</StyledTableCell>
          <StyledTableCell align="center">Change password</StyledTableCell>
          <StyledTableCell align="center">Delete User</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {userList.map((user) => (
          <TableRowSingle key={user.id} user={user} editTraining={editTraining} editPassword={editPassword} deleteUser={deleteUser}/>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
export default TableAllUsers;
