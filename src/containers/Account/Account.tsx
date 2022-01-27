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

const Account: React.FC = () => {
  const currentId: string | null = localStorage.getItem("id");
  const [userList, setUser] = useState<User[]>(listUsers.listUsers);
  let [name, setName] = useState<Values>({
    username: "",
  });
  let user: User | undefined = userList.find((item) => item.id === currentId);
  const [searchedUserList, setSearchedUserList] = useState<User[]>([]);
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupTitle, setTitle] = useState<string>("");
  const [popupContent, setContent] = useState<string>("");
  const [open, setOpen] = React.useState(false);

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

  const editTraining = (userId: string) => {
    console.log("edit traning");
  };

  const editPassword = (userId: string) => {
    setOpen(!open);
    console.log(open);

    let dialog = (
      <Dialog
        title={"Promena passworda"}
        content={"Unesite zeljene izmene"}
        handleClose={() => editTraining(userId)}
        open={open}
        addFunction={() => editTraining(userId)}
      >
        <p>Igor</p>
      </Dialog>
    );
    console.log(dialog)
    return dialog;
  };

  const deleteUser = (userId: string) => {
    listUsers.removeUser(userId);
    let newList: User[] = [...listUsers.listUsers];
    setUser(newList);

    let newListSearch: User[] = [
      ...searchedUserList.filter((user) => user.id !== userId),
    ];
    setSearchedUserList(newListSearch);
  };

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
              editTraining={editTraining}
              editPassword={editPassword}
              deleteUser={deleteUser}
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
              editTraining={editTraining}
              editPassword={editPassword}
              deleteUser={deleteUser}
            />
          )}
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
    </div>
  );
};

export default Account;
