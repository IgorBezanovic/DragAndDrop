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
import EditNumTrainings from "../../components/Dialogs/EditNumTrainings/index";
import EditPassword from "../../components/Dialogs/EditPassword/index";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutDialog from "../../components/Dialogs/LogoutDialog/index";
import DeleteUserDialog from "../../components/Dialogs/DeleteUserDialog/index";
import AddNewUser from "../../components/Dialogs/AddNewUser/index";
import { v4 as uuidv4 } from "uuid";
import {
  CHANGE_PASSWORD,
  DELETE_USER,
  DELETE_USER_ACTION,
  EDITING_PASSWORD,
  EDIT_NUM_TRAININGS,
  ENTER_THE_NAME,
  LOGOUT,
  LOGOUT_ACTION,
  MINIMUM_EIGHT_CHAR,
  MUST_BE_THE_SAME,
  MUST_ONE_NUMBER,
  NEW_USER_REG,
  NOT_ENTER_PASSWORD,
  NOT_REPEAT_PASSWORD,
  NOT_SELECTED_PACKAGE,
  NOT_VALID_USERNAME,
  PAYMENT_PACKAGES,
  REQUIRED_INFO,
  SEARCH_MEMBERS,
} from "../../common/constants";

const Account: React.FC = () => {
  const currentId: string | null = localStorage.getItem("id");
  const [userList, setUser] = useState<User[]>(listUsers.listUsers);
  let [name, setName] = useState<Values>({
    username: "",
  });
  let [userEdit, setEditUser] = useState<Values>({
    id: "",
    username: "",
    lastName: "",
    password: "",
    newPassword: "",
    repeatPassword: "",
    role: "",
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
  const [openNewUser, setOpenNewUser] = useState<boolean>(false);
  const [editUser, setEditUserId] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
      popupLogic(SEARCH_MEMBERS, ENTER_THE_NAME);
      setSearchedUserList([]);
    }
  };

  const handleShowUsers = () => {
    setShowUsers(!showUsers);
  };

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
        popupLogic(PAYMENT_PACKAGES, NOT_SELECTED_PACKAGE);
      }
    } else {
      popupLogic(PAYMENT_PACKAGES, NOT_VALID_USERNAME);
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

  const handleEditPassword = (userId: string) => {
    setEditUserId(userId);
    handleOpenPassword();
  };

  const handleOpenPassword = () => {
    setOpenEditPassword(true);
  };

  const helperCheckAndSetPassword = (checkUserName: boolean, userEdit: Values, editUserIndex: number) => {
    if (!checkUserName) {
      return popupLogic(CHANGE_PASSWORD, NOT_VALID_USERNAME);
    }

    if (!userEdit.newPassword) {
      return popupLogic(CHANGE_PASSWORD, NOT_ENTER_PASSWORD);
    }

    if (!userEdit.repeatPassword) {
      return popupLogic(CHANGE_PASSWORD, NOT_REPEAT_PASSWORD);
    }

    if (userEdit.newPassword !== userEdit.repeatPassword) {
      return popupLogic(CHANGE_PASSWORD, MUST_BE_THE_SAME);
    }

    if (userEdit.repeatPassword!.length <= 8) {
      return popupLogic(CHANGE_PASSWORD, MINIMUM_EIGHT_CHAR);
    }

    if (!userEdit.repeatPassword.match(/\d+/g)) {
      return popupLogic(CHANGE_PASSWORD, MUST_ONE_NUMBER);
    }

    listUsers.listUsers[editUserIndex].password = userEdit.repeatPassword!;
    setEditUser({
      username: "",
      newPassword: "",
      repeatPassword: "",
      numTrainings: 0,
    });
    setOpenEditPassword(false);
  };

  const handleClosePassword = () => {
    let editUserIndex = listUsers.listUsers.findIndex(
      (user) => user.id === editUser
    );

    let checkUserName =
      listUsers.listUsers[editUserIndex].username === userEdit.username;

    helperCheckAndSetPassword(checkUserName, userEdit, editUserIndex);
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
    localStorage.setItem("id", "");
    window.location.reload();
    setOpenLogout(false);
  };
  const handlerOpenLogout = () => {
    setOpenLogout(true);
  };
  const handlerCancelLogout = () => {
    setOpenLogout(false);
  };
  const registerNewUser = () => {
    if (userEdit) {
      let newUser = {
        id: uuidv4(),
        username: userEdit.username,
        lastName: userEdit.lastName!,
        password: userEdit.password!,
        role: userEdit.role!,
        numTrainings: +userEdit.numTrainings!,
      };
      listUsers.listUsers.push(newUser);
      setUser([...listUsers.listUsers]);
    }
    setOpenNewUser(false);
  };
  const handlerOpenNewUser = () => {
    setOpenNewUser(true);
  };
  const handlerCancelNewUser = () => {
    setOpenNewUser(false);
  };
  return (
    <div className="wrapper-account">
      <h1 className="welcome-title">Welcome, {user?.username}</h1>
      <p>The number of my remaining training is: {user?.numTrainings}</p>
      {user?.role === "admin" ? (
        <div>
          <Button
            variant="outlined"
            color="success"
            startIcon={<AddIcon />}
            onClick={handlerOpenNewUser}
          >
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
            title={EDITING_PASSWORD}
            content={MINIMUM_EIGHT_CHAR + " and " + MUST_ONE_NUMBER}
            handleClose={handleCancelPassword}
            open={openEditPassword}
            addTraining={handleClosePassword}
            handleChangeUser={handleChangeUser}
            user={userEdit}
            handleClickShowPassword={handleClickShowPassword}
            handleClickShowRepeatPassword={handleClickShowRepeatPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            showPassword={showPassword}
            showRepeatPassword={showRepeatPassword}
          />
          <EditNumTrainings
            title={EDIT_NUM_TRAININGS}
            content={REQUIRED_INFO}
            handleClose={handleCancelNumTraining}
            open={openEditNumTrainings}
            addTraining={handleCloseNumTraining}
            handleChangeUser={handleChangeUser}
            user={userEdit}
          />
          <DeleteUserDialog
            title={DELETE_USER}
            content={DELETE_USER_ACTION}
            handleClose={handleCancelRemoveUser}
            open={openRemoveUser}
            deleteUser={deleteUser}
          />
          <AddNewUser
            title={NEW_USER_REG}
            content={REQUIRED_INFO}
            handleClose={handlerCancelNewUser}
            open={openNewUser}
            addTraining={registerNewUser}
            handleChangeUser={handleChangeUser}
            user={userEdit}
          />
        </div>
      ) : (
        <div>
          <h2>To do:</h2>
          <p>dodavanje usera-a - DONE</p>
          <p>brisanje user-a - DONE</p>
          <p>promena passworda - DONE</p>
          <p>u class-i user dodati lastName i password odvojeno - DONE</p>
          <p>izvlacenje konstanti - DONE</p>
          <p>uslovi prilikom registracije - PROGRESS</p>
        </div>
      )}
      {isOpen && (
        <Popup
          title={popupTitle}
          content={popupContent}
          handleClose={togglePopup}
        />
      )}
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<LogoutIcon />}
        onClick={handlerOpenLogout}
      >
        Logout
      </Button>
      <LogoutDialog
        title={LOGOUT}
        content={LOGOUT_ACTION}
        handleClose={handlerCancelLogout}
        open={openLogout}
        addTraining={logout}
      />
    </div>
  );
};

export default Account;
