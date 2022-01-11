import React, { useState } from "react";
import "./style.css";
import { Training } from "../../types/training.model";
import { listDays } from "../../service/listDays";
import { listTrainings } from "../../service/listTrainings";
import DayButton from "../../components/DayButton/dayButton";
import TrainingWrapper from "../../components/TrainingWrapper/trainingWrapper";

const todayTrainings: Training[] = listTrainings.filter(
  (item) => item.day !== "d2"
);
const tomorrowTrainings: Training[] = listTrainings.filter(
  (item) => item.day !== "d1"
);

const Trainings: React.FC = () => {
  const [isToday, setToday] = useState<boolean>(true);
  const [isTomorrow, setTomorrow] = useState<boolean>(false);
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

  const takeSpot = (id: number, day: string) => {
    let foundIndex: number = listTrainings.findIndex((item) => item.id === id);

    let alreadyReserved = listTrainings.filter(
      (training) =>
        training.id === id &&
        training.members.find(
          (member) =>
            member.name === localStorage.getItem("name") &&
            member.lastName === localStorage.getItem("lastName")
        )
    );

    if (!alreadyReserved.length) {
      if (
        !!listTrainings[foundIndex].freeSpace &&
        listTrainings[foundIndex].day === day
      ) {
        let newList: Training[] = [...listTrainings];
        newList[foundIndex].freeSpace = --newList[foundIndex].freeSpace;
        newList[foundIndex].members.push({
          id: newList[foundIndex].members.length + 1,
          name: localStorage.getItem("name"),
          lastName: localStorage.getItem("lastName"),
        });
        console.log(newList);
        if (newList[foundIndex].day === "d1") {
          setTodayTraining(newList.filter((list) => list.day === day));
        } else {
          setTomorrowTraining(newList.filter((list) => list.day === day));
        }
        window.alert("Uspešno ste zakazali trening! :)");
      } else {
        window.alert("Sva mesta su popunjana");
      }
    } else {
      window.alert("Vec ste zakazali trening u ovom terminu! :)");
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
        {isToday ? (
          <TrainingWrapper
            title={"Danasnji treninzi"}
            list={todayTrainingsList}
            takeSpot={takeSpot}
          />
        ) : (
          <TrainingWrapper
            title={"Sutrasnji treninzi"}
            list={tomorrowTrainingsList}
            takeSpot={takeSpot}
          />
        )}
      </div>
    </div>
  );
};

export default Trainings;
