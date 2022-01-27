import React, { useState } from "react";
import listUsers from "../../service/listUsers";
import { User } from "../../types/user.model";
import "./style.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Values } from "../../types/values.model";
import TableAllUsers from "../../components/Table/index";
import Popup from "../../common/Popup/popup";
import Dialog from "../../common/Dialog/dialog";
import EditNumTrainings from "../../components/Dialogs/EditNumTrainings/index";
import EditPassword from "../../components/Dialogs/EditPassword/index";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutDialog from "../../components/Dialogs/LogoutDialog/index";
const Account: React.FC = () => {
  const currentId: string | null = localStorage.getItem("id");
  const [userList, setUser] = useState<User[]>(listUsers.listUsers);
  let [name, setName] = useState<Values>({
    username: "",
  });
  let [userEdit, setEditUser] = useState<Values>({
    username: "",
    newPassword: "",
    repeatPassword: "",
    numTrainings: 0,
  });
  let user: User | undefined = userList.find((item) => item.id === currentId);
  const [searchedUserList, setSearchedUserList] = useState<User[]>([]);
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupTitle, setTitle] = useState<string>("");
  const [popupContent, setContent] = useState<string>("");
  const [openEditNumTrainings, setOpenEditNumTrainings] =
    useState<boolean>(false);
  const [openEditPassword, setOpenEditPassword] = useState<boolean>(false);
  const [openRemoveUser, setOpenRemoveUser] = useState<boolean>(false);
  const [openLogout, setOpenLogout] = useState<boolean>(false);
  const [editUser, setEditUserId] = useState<string>("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const popupLogic = (title: string, content: string) => {
    togglePopup();
    setTitle(title);
    setContent(content);
    setTimeout(() => setIsOpen(false), 3000);
  };

  const updateName = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Values
  ) => {
    setName({
      ...name,
      [field]: e.target.value,
    });
  };

  const handleChangeUser = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: keyof Values
  ) => {
    setEditUser({
      ...userEdit,
      [field]: e.target.value,
    });
  };

  const updateList = () => {
    if (name.username) {
      let newList: User[] = [
        ...userList.filter((user) =>
          user.username.toLowerCase().includes(name.username.toLowerCase())
        ),
      ];
      setSearchedUserList(newList);
    } else {
      popupLogic("Pretraga clanova", "Molimo vas unesite zeljeno ime");
      setSearchedUserList([]);
    }
  };

  const handleShowUsers = () => {
    setShowUsers(!showUsers);
  };
  //dodavanje broja treninga
  const handleEditNumTraining = (userId: string) => {
    setEditUserId(userId);
    handleOpenNumTraining();
  };

  const handleOpenNumTraining = () => {
    setOpenEditNumTrainings(true);
  };

  const handleCloseNumTraining = () => {
    let editUserIndex = listUsers.listUsers.findIndex(
      (user) => user.id === editUser
    );
    if (listUsers.listUsers[editUserIndex].username === userEdit.username) {
      if (userEdit.numTrainings) {
        listUsers.listUsers[editUserIndex].numTrainings +=
          +userEdit.numTrainings;
        setEditUser({
          username: "",
          newPassword: "",
          repeatPassword: "",
          numTrainings: 0,
        });
        setOpenEditNumTrainings(false);
      } else {
        popupLogic(
          "Uplata paketa treninga",
          "Niste odabrali paket za uplatu treninga"
        );
      }
    } else {
      popupLogic(
        "Uplata paketa treninga",
        "Niste uneli ispravno ime korisnika za uplatu paketa treninga"
      );
    }
  };
  const handleCancelNumTraining = () => {
    setEditUser({
      username: "",
      newPassword: "",
      repeatPassword: "",
      numTrainings: 0,
    });
    setOpenEditNumTrainings(false);
  };

  // editovanje passworda
  const handleEditPassword = (userId: string) => {
    setEditUserId(userId);
    handleOpenPassword();
  };

  const handleOpenPassword = () => {
    setOpenEditPassword(true);
  };

  const handleClosePassword = () => {
    let editUserIndex = listUsers.listUsers.findIndex(
      (user) => user.id === editUser
    );
    if (listUsers.listUsers[editUserIndex].username === userEdit.username) {
      if (userEdit.newPassword) {
        if (userEdit.repeatPassword) {
          if (userEdit.newPassword === userEdit.repeatPassword) {
            if (userEdit.repeatPassword.length >= 8) {
              if (userEdit.repeatPassword.match(/\d+/g)) {
                listUsers.listUsers[editUserIndex].password =
                  userEdit.repeatPassword;
                setEditUser({
                  username: "",
                  newPassword: "",
                  repeatPassword: "",
                  numTrainings: 0,
                });
                setOpenEditPassword(false);
              } else {
                popupLogic(
                  "Promena passworda",
                  "Password mora da ima minimum 1 broj"
                );
              }
            } else {
              popupLogic(
                "Promena passworda",
                "Password mora da ima minimum 8 karaktera"
              );
            }
          } else {
            popupLogic("Promena passworda", "Password mora biti isti.");
          }
        } else {
          popupLogic("Promena passworda", "Niste uneli ponovljeni password");
        }
      } else {
        popupLogic("Promena passworda", "Niste uneli password");
      }
    } else {
      popupLogic(
        "Promena passworda",
        "Niste uneli ispravno ime korisnika za promenu passworda"
      );
    }
  };

  const handleCancelPassword = () => {
    setEditUser({
      username: "",
      newPassword: "",
      repeatPassword: "",
      numTrainings: 0,
    });
    setOpenEditPassword(false);
  };

  const handleOpenRemoveUser = (userId: string) => {
    setEditUserId(userId);
    setOpenRemoveUser(true);
  };
  const handleCancelRemoveUser = () => {
    setOpenRemoveUser(false);
  };
  const deleteUser = () => {
    listUsers.removeUser(editUser);
    let newList: User[] = [...listUsers.listUsers];
    setUser(newList);

    let newListSearch: User[] = [
      ...searchedUserList.filter((user) => user.id !== editUser),
    ];
    setSearchedUserList(newListSearch);
    setOpenRemoveUser(false);
  };

  const logout = () => {
    localStorage.setItem("id", '')
    window.location.reload()
    setOpenLogout(false)
  }
  const handlerOpenLogout = () => {
    setOpenLogout(true);

  }
  const handlerCancelLogout = () => {
    setOpenLogout(false)
  }
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
            <label>
              <p className="label-name">Search by user name:</p>
              <input
                type="text"
                name="username"
                onChange={(e) => updateName(e, "username")}
                value={name.username}
              />
            </label>
            <button onClick={updateList} type="submit">
              Search
            </button>
          </div>
          {!!searchedUserList.length && (
            <TableAllUsers
              userList={searchedUserList}
              editTraining={handleEditNumTraining}
              editPassword={handleEditPassword}
              deleteUser={handleOpenRemoveUser}
            />
          )}
          <Button
            variant="outlined"
            color="success"
            startIcon={showUsers ? <VisibilityOffIcon /> : <VisibilityIcon />}
            onClick={handleShowUsers}
          >
            {showUsers ? "Hide users" : "Show all users"}
          </Button>
          {showUsers && (
            <TableAllUsers
              userList={userList}
              editTraining={handleEditNumTraining}
              editPassword={handleEditPassword}
              deleteUser={handleOpenRemoveUser}
            />
          )}
          <EditPassword
            title={"Editing password"}
            content={
              "Password mora da ima minimum 8 karaktera, od toga 1 mora biti broj"
            }
            handleClose={handleCancelPassword}
            open={openEditPassword}
            addTraining={handleClosePassword}
            handleChangeUser={handleChangeUser}
            user={userEdit}
          />
          <EditNumTrainings
            title={"Editing number of trainings"}
            content={"Unesite trazene podatke"}
            handleClose={handleCancelNumTraining}
            open={openEditNumTrainings}
            addTraining={handleCloseNumTraining}
            handleChangeUser={handleChangeUser}
            user={userEdit}
          />
          <Dialog
            title={"Brisanje korisnika"}
            content={"Ovom akcijom obrisacete korisnika vasih usluga"}
            handleClose={handleCancelRemoveUser}
            open={openRemoveUser}
            addFunction={deleteUser}
          >
            <br></br>
            <p>
              <strong>
                Da li ste sigurni da zelite da obrisete korisnika?
              </strong>
            </p>
          </Dialog>
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
      {isOpen && (
        <Popup
          title={popupTitle}
          content={popupContent}
          handleClose={togglePopup}
        />
      )}
      <Button variant="outlined" color="secondary" startIcon={<LogoutIcon />} onClick={handlerOpenLogout}>
        Logout
      </Button>
      <LogoutDialog
        title={'Logout'}
        content={''}
        handleClose={handlerCancelLogout}
        open={openLogout}
        addTraining={logout}
      />
    </div>
  );
};

export default Account;
