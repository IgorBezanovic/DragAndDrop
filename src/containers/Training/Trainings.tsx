import React, { useState } from "react";
import "./style.css";
import { Training } from "../../types/training.model";
import { listDays } from "../../service/listDays";
import listTrainings from "../../service/newList";
import DayButton from "../../components/DayButton/dayButton";
import TrainingWrapper from "../../components/TrainingWrapper/trainingWrapper";
import { v4 as uuidv4 } from 'uuid';

const Trainings: React.FC = () => {
  const [isToday, setToday] = useState<boolean>(true);
  const [isTomorrow, setTomorrow] = useState<boolean>(false);

  let todayTrainings: Training[] = listTrainings.listTrainings.filter(
    (item) => item.day !== "d2"
  );

  let tomorrowTrainings: Training[] = listTrainings.listTrainings.filter(
    (item) => item.day !== "d1"
  );

  const [todayTrainingsList, setTodayTraining] =
    useState<Training[]>(todayTrainings);
  const [tomorrowTrainingsList, setTomorrowTraining] =
    useState<Training[]>(tomorrowTrainings);

  const handleToday = () => {
    setToday(true);
    setTomorrow(false);
  };

  const handleTomorrow = () => {
    setToday(false);
    setTomorrow(true);
  };

  const takeSpot = (id: string, day: string) => {
    let alreadyReserved = listTrainings.listTrainings.filter(
      (training) =>
        training.id === id &&
        training.members.find(
          (member) =>
            member.name === localStorage.getItem("name") &&
            member.lastName === localStorage.getItem("lastName")
        )
    );

    let freeSpaceIndex = listTrainings.listTrainings.findIndex(
      (item) => item.id === id
    );

    if (listTrainings.listTrainings[freeSpaceIndex].freeSpace) {
      if (!alreadyReserved.length) {
        let newMember = {
          id: uuidv4(),
          name: localStorage.getItem("name"),
          lastName: localStorage.getItem("lastName"),
        };
        listTrainings.addMember(id, newMember);
        let newList = [...listTrainings.listTrainings];
          if (day === "d1") {
            setTodayTraining(newList.filter((item) => item.day === day).sort());
          } else {
            setTomorrowTraining(newList.filter((list) => list.day === day));
          }
        window.alert("Uspešno ste zakazali trening! :)");
      } else {
        window.alert("Vec ste zakazali trening u ovom terminu! :)");
      }
    } else {
      window.alert("Sva mesta su popunjana");
    }
  };

  return (
    <div className="training-wrapper">
      <div className="choose-day">
        {listDays.map((item) => (
          <DayButton
            key={item.id}
            item={item}
            isToday={isToday}
            isTomorrow={isTomorrow}
            handleToday={handleToday}
            handleTomorrow={handleTomorrow}
          />
        ))}
      </div>
      <div>
        <TrainingWrapper
          title={isToday ? "Danasnji treninzi" : "Sutrasnji treninzi"}
          list={isToday ? todayTrainingsList : tomorrowTrainingsList}
          takeSpot={takeSpot}
        />
      </div>
    </div>
  );
};

export default Trainings;
