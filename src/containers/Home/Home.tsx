import React, { useState } from "react";
import listTrainings from "../../service/listTrenings";
import listUsers  from "../../service/listUsers";
import { Training } from "../../types/training.model";
import AllTrainings from "../../components/AllTrainings/allTrainings";
import "./style.css";
import { v4 as uuidv4 } from "uuid";
import Popup from "../../common/Popup/popup";
import Dialog from "../../common/Dialog/dialog"
import TextField from "@mui/material/TextField";
import { User } from "../../types/user.model";

const Home: React.FC = () => {
  const currentId: string | null = localStorage.getItem("id");
  const userList = listUsers.listUsers;
  let user: User | undefined = userList.find((item) => item.id === currentId);

  const [listMembers, setMembers] = useState<Training[]>(
    listTrainings.listTrainings
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupTitle, setTitle] = useState<string>("");
  const [popupContent, setContent] = useState<string>("");
  const [open, setOpen] = React.useState(false);

  let [newTraining, setValue] = useState<Training>({
    id: "",
    day: "",
    startHours: "",
    freeSpace: 0,
    extraTermin: true,
    members: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: keyof Training
  ) => {
    setValue({
      ...newTraining,
      [field]: e.target.value,
    });
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

  const removeMember = (memberId: string, trainingId: string) => {
    listTrainings.removeMember(trainingId, memberId);
    let newList: Training[] = [...listTrainings.listTrainings];
    setMembers(newList);
    popupLogic("Brisanje sa liste clanova", "Clan je uspesno obrisan.");
  };

  const addMember = (id: string) => {
    let freeSpaceIndex: number = listTrainings.listTrainings.findIndex(
      (item) => item.id === id
    );
    if (listTrainings.listTrainings[freeSpaceIndex].freeSpace) {
      let newUser: User = {
        id: uuidv4(),
        username: window.prompt("Unesite ime klijenta?", "Probni")!,
        password: window.prompt("Unesite prezime klijenta?", "trening")!,
        role: "member",
        numTrainings: 1
      };
      listTrainings.addMember(id, newUser);
      let newList: Training[] = [...listTrainings.listTrainings];
      setMembers(newList);
      popupLogic("Zakazivanje treninga", "Klijent je uspesno dodat!");
    } else {
      popupLogic("Zakazivanje treninga", "Sva mesta su popunjena!");
    }
  };

  const addTraining = () => {
    if (
      newTraining.day !== "" &&
      newTraining.startHours !== "" &&
      newTraining.freeSpace !== 0 
    ) {
      newTraining.id = uuidv4();
      listTrainings.addTraining(newTraining);
      let newList: Training[] = [...listTrainings.listTrainings];
      setMembers(newList);
      handleClose();
      popupLogic("Dodavanje treninga", "Trening je uspesno dodat.");
    } else {
      handleClose();
      popupLogic("Morate popuniti sva polja", "Sva polja moraju biti popunjena kako bi se trening uspesno dodao.");
    }
  };

  const removeTraining = (id: string) => {
    listTrainings.removeTraining(id);
    let newList: Training[] = [...listTrainings.listTrainings];
    setMembers(newList);
    popupLogic("Brisanje dnevnog treninga", "Trening je uspesno obrisan.");
  };

  return (
    <div className="wrapper-home">
      <h1 className="welcome-title">Welcome, {user?.username}</h1>

      {user?.role === "admin" ? (
        <div className="wrapper-content">
          <button
            className="submit add-training green"
            onClick={() => handleClickOpen()}
            style={{ margin: "10px 0" }}
          >
            Add Training
          </button>
          {listMembers.map((training) => (
            <AllTrainings
              key={training.id}
              training={training}
              removeTraining={removeTraining}
              addMember={addMember}
              removeMember={removeMember}
            />
          ))}
          {isOpen && (
            <Popup
              title={popupTitle}
              content={popupContent}
              handleClose={togglePopup}
            />
          )}
          <Dialog
            title={"Dodavanje treninga"}
            content={"Unesite trazene informacije: "}
            handleClose={handleClose}
            open={open}
            addFunction={addTraining}
          >
            <label className="radio-label">
                Today
                  <input
                    type="radio"
                    value='d1'
                    className="radio-button"
                    onChange={(e) => handleChange(e, "day")}
                    checked={newTraining.day === 'd1'}
                  />
              </label>
              <label className="radio-label">
                Tomorrow
                  <input
                    type="radio"
                    value='d2'
                    className="radio-button"
                    onChange={(e) => handleChange(e, "day")}
                    checked={newTraining.day === 'd2'}
                  />
              </label>
              <TextField
                margin="dense"
                id="startHours"
                label="Enter the start time?"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "startHours")}
                value={newTraining.startHours}
              />
              <TextField
                margin="dense"
                id="freeSpace"
                label="Enter the number of free space ?"
                type="number"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e, "freeSpace")}
                value={newTraining.freeSpace}
              />
          </Dialog>
        </div>
      ) : (
        <div>
          <p>Ovde mozes procitati vise o nasim organizacijama</p>
          <a href="https://www.levi9.com/">Levi9</a>
          <a href="https://inside.rs.levi9.com/">Levi9 - inside</a>
          <a href="https://www.crossfit.com/">CrossFit</a>
        </div>
      )}
    </div>
  );
};

export default Home;
