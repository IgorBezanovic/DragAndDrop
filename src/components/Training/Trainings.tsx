import React, { useState } from "react";
import "./style.css";
import { Training } from '../../models/training.model'
import { listDays } from '../../service/listDays'
import { listTrainings } from '../../service/listTrainings'

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

  const takeSpot = (id: number) => {
    let foundIndex: number = todayTrainingsList.findIndex(
      (item) => item.id === id
    );

    let alreadyReserved = todayTrainingsList.filter(
      (training) =>
        training.id === id &&
        training.members.find(
          (member) =>
            member.name === localStorage.getItem("name") &&
            member.lastName === localStorage.getItem("lastName")
        )
    );

    if (!alreadyReserved.length) {
      if (!!todayTrainingsList[foundIndex].freeSpace) {
        let newList: Training[] = [...todayTrainingsList];
        newList[foundIndex].freeSpace = --newList[foundIndex].freeSpace;
        newList[foundIndex].members.push({
            id: 1,
            name: localStorage.getItem("name"),
            lastName: localStorage.getItem("lastName"),
        });
        setTodayTraining(newList);
        if (todayTrainingsList[foundIndex].freeSpace < 1) {
          document
            .querySelector(
              `.training-termin-${todayTrainingsList[foundIndex].id}`
            )
            ?.classList.add("redBorder");
          document
            .querySelector(
              `.training-free-space-${todayTrainingsList[foundIndex].id}`
            )
            ?.classList.add("redBorder");
        } else if (todayTrainingsList[foundIndex].freeSpace <= 5) {
          document
            .querySelector(
              `.training-termin-${todayTrainingsList[foundIndex].id}`
            )
            ?.classList.add("yellowBorder");
          document
            .querySelector(
              `.training-free-space-${todayTrainingsList[foundIndex].id}`
            )
            ?.classList.add("yellowBorder");
        }
      } else {
        window.alert("Sva mesta su popunjana");
      }
    } else {
      window.alert("Vec ste zakazali trening u ovom terminu! :)");
    }
    console.log(todayTrainingsList);
  };

  const renderContent = () => {
    if (isToday) {
      return (
        <div className="content-training">
          <p className="content-title">Danasnji treninzi</p>
          <div className="grid-template">
            {todayTrainingsList.map((item) => (
              <div className="single-training-wrapper" key={item.id}>
                <div className="single-training">
                  <p className={`training-termin training-termin-${item.id}`}>
                    {item.startHours}
                  </p>
                  <button
                    className={`training-free-space training-free-space-${item.id}`}
                    onClick={() => takeSpot(item.id)}
                  >
                    {item.freeSpace}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          Sutrasnji treninzi
          {tomorrowTrainingsList.map((item) => (
            <div key={item.id}>
              {item.startHours}, {item.freeSpace}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="training-wrapper">
      <div className="choose-day">
        {listDays.map((item) => (
          <button
            className="day"
            style={
              item.id === "d1"
                ? isToday
                  ? { background: "#339DFF" }
                  : { background: "white" }
                : isTomorrow
                ? { background: "#339DFF" }
                : { background: "white" }
            }
            key={item.id}
            onClick={item.id === "d1" ? handleToday : handleTomorrow}
          >
            {item.day}
          </button>
        ))}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default Trainings;
