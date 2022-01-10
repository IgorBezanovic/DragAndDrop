import React, { useState } from "react";
import { listTrainings } from "../../service/listTrainings";
import { Training } from "../../models/training.model";
import "./style.css";

const Home: React.FC = () => {
  const name: string | null = localStorage.getItem("name");
  const role: string | null = localStorage.getItem("role");
  const [listMembers, setMembers] = useState<Training[]>(listTrainings);

  let newList: Training[] = [...listTrainings];

  const removeMember = (memberId: number, trainingId: number) => {
    let foundIndex: number = listTrainings.findIndex(
      (item) => item.id === trainingId
    );
    // let newList: Training[] = [...listTrainings];
    newList[foundIndex].freeSpace = ++newList[foundIndex].freeSpace;
    newList[foundIndex].members = newList[foundIndex].members.filter(
      (member) => member.id !== memberId
    );
    setMembers(newList);
  };

  const addMember = (id: number) => {
    let foundIndex: number = listTrainings.findIndex((item) => item.id === id);
    // let newList: Training[] = [...listTrainings];
    if (newList[foundIndex].freeSpace) {
      newList[foundIndex].freeSpace = --newList[foundIndex].freeSpace;
      newList[foundIndex].members.push({
        id: newList[foundIndex].members.length + 1,
        name: window.prompt("Unesite ime klijenta?", "Probni"),
        lastName: window.prompt("Unesite prezime klijenta?", "trening"),
      });
      setMembers(newList);
      console.log(newList);
    } else {
      window.alert("Sva mesta su popunjena!");
    }
  };

  const addTraining = () => {
    // let newList: Training[] = [...listTrainings];

    let newTraining: Training = {
        id: 211,
        day: "d1",
        startHours: "21:00",
        freeSpace: 12,
        members: [],
      }

    newList.push(newTraining);

    // newList = [...listTrainings, {
    //     id: 212,
    //     day: "d1",
    //     startHours: "21:00",
    //     freeSpace: 12,
    //     members: [],
    //     }]

    setMembers(newList);
  };

  const removeTraining = (id: number) => {
    // let newList: Training[] = [...listTrainings];

    newList = [...newList.filter((training) => training.id !== id)];
    setMembers(newList);
  };

  const renderContent = () => {
    if (role === "admin") {
      return (
        <div>
          <button onClick={addTraining} style={{ margin: "10px 0" }}>
            Add Training
          </button>
          <br />
          {listMembers.map((item) => (
            <div key={item.id}>
              {item.startHours}
              <button onClick={() => addMember(item.id)}>Add Member</button>
              <button onClick={() => removeTraining(item.id)}>
                Remove training
              </button>
              {item.members.map((member) => (
                <div key={member.id}>
                  <p>
                    {member.name} {member.lastName}
                  </p>
                  <button onClick={() => removeMember(member.id, item.id)}>
                    Remove Member
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <p>Ovde mozes procitati vise o nasim organizacijama</p>
          <a href="https://www.levi9.com/">Levi9</a>
          <a href="https://inside.rs.levi9.com/">Levi9 - inside</a>
          <a href="https://www.crossfit.com/">CrossFit</a>
        </div>
      );
    }
  };
  return (
    <div className="wrapper-home">
      <h2>Welcome, {name}</h2>

      {renderContent()}
    </div>
  );
};

export default Home;
