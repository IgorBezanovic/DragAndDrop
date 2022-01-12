import React, { useState } from "react";
import listTrainings from "../../service/newList";
import { Training } from "../../types/training.model";
import AllTrainings from "../../components/AllTrainings/allTrainings";
import "./style.css";

const Home: React.FC = () => {
  const name: string | null = localStorage.getItem("name");
  const role: string | null = localStorage.getItem("role");
  const [listMembers, setMembers] = useState<Training[]>(listTrainings.listTrainings);

  const removeMember = (memberId: number, trainingId: number) => {
    let foundIndex: number = listTrainings.listTrainings.findIndex(
      (item) => item.id === trainingId
    );

    let newList: Training[] = [...listTrainings.listTrainings];
    newList[foundIndex].freeSpace = ++newList[foundIndex].freeSpace;
    newList[foundIndex].members = newList[foundIndex].members.filter(
      (member) => member.id !== memberId
    );
    setMembers(newList);
  };

  const addMember = (id: number) => {
    let foundIndex: number = listTrainings.listTrainings.findIndex((item) => item.id === id);
    let newList: Training[] = [...listTrainings.listTrainings];
    if (newList[foundIndex].freeSpace) {
      newList[foundIndex].freeSpace = --newList[foundIndex].freeSpace;
      newList[foundIndex].members.push({
        id: newList[foundIndex].members.length + 1,
        name: window.prompt("Unesite ime klijenta?", "Probni"),
        lastName: window.prompt("Unesite prezime klijenta?", "trening"),
      });
      setMembers(newList);
    } else {
      window.alert("Sva mesta su popunjena!");
    }
  };

  const addTraining = () => {
    let noviTrening = {
        id: +window.prompt("Unesite id, kao broj?")!,
        day: window.prompt("d1 ili d2?")!,
        startHours: window.prompt("U koliko sati pocinje tr?")!,
        freeSpace: +window.prompt("Koji je broj slobodnih mesta?")!,
        members: [],
      }
    listTrainings.addTraining(noviTrening)
    let newList: Training[] = [...listTrainings.listTrainings]
    setMembers(newList)
  };

  const removeTraining = (id: number) => {
    listTrainings.removeTraining(id);
    let newList: Training[] = [...listTrainings.listTrainings]
    setMembers(newList);
  };

  return (
    <div className="wrapper-home">
      <h2>Welcome, {name}</h2>

      {role === "admin" ? (
        <div>
          <button onClick={() => addTraining()} style={{ margin: "10px 0" }}>
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
