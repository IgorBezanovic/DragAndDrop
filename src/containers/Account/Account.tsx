import React, { useState } from "react";
import listUsers from "../../service/listUsers";
import { User } from "../../types/user.model";
import "./style.css"
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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

const Account: React.FC = () => {
  const currentId: string | null = localStorage.getItem("id");
  const [userList, setUser] = useState<User[]>(listUsers.listUsers);
  let user: User | undefined = userList.find((item) => item.id === currentId);

  return (
    <div className="wrapper-account">
      <h1 className="welcome-title">Welcome, {user?.username}</h1>
      <p>Broj mojih preostalih treninga je: {user?.numTrainings}</p>
      {user?.role === "admin" ? (
        <div>
          <Button variant="outlined" color="success" startIcon={<AddIcon />}>
            New User
          </Button>
          <div style={{ margin: "20px 0" }}>
            Search User by name:
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="on"
            >
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </Box>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
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
                  <StyledTableRow key={user.id}>
                    <StyledTableCell component="th" scope="row">
                      {user.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {user.username}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {user.lastName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {user.password}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {user.numTrainings}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="outlined"
                        color="success"
                        startIcon={<AddIcon />}
                      >
                        Num Trainings
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<EditIcon />}
                      >
                        Password
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                      >
                        User
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div>
          <h2>To do:</h2>
          <p>dodavanje usera-a</p>
          <p>brisanje user-a</p>
          <p>promena passworda </p>
          <p>u class-i user dodati lastName i password odvojeno - DONE</p>
        </div>
      )}
    </div>
  );
};

export default Account;
