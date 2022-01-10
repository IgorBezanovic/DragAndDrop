import React, { useState } from "react";
import "./style.css";
import { Training } from "../../models/training.model";
import { listDays } from "../../service/listDays";
import { listTrainings } from "../../service/listTrainings";

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
        console.log(newList)
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

  const renderContent = () => {
    if (isToday) {
      return (
        <div className="content-training">
          <p className="content-title">Danasnji treninzi</p>
          <div className="grid-template">
            {todayTrainingsList.map((item) => (
              <div className="single-training-wrapper" key={item.id}>
                <div className="single-training">
                  <p
                    className="training-termin"
                    style={
                      item.freeSpace < 1
                        ? { border: "1px solid red" }
                        : item.freeSpace < 5
                        ? { border: "1px solid yellow" }
                        : {}
                    }
                  >
                    {item.startHours}
                  </p>
                  <button
                    className="training-free-space"
                    style={
                      item.freeSpace < 1
                        ? { border: "1px solid red" }
                        : item.freeSpace < 5
                        ? { border: "1px solid yellow" }
                        : {}
                    }
                    onClick={() => takeSpot(item.id, item.day)}
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
        <div className="content-training">
          <p className="content-title">Sutrasnji treninzi</p>
          <div className="grid-template">
            {tomorrowTrainingsList.map((item) => (
              <div className="single-training-wrapper" key={item.id}>
                <div className="single-training">
                  <p
                    className="training-termin"
                    style={
                      item.freeSpace < 1
                        ? { border: "1px solid red" }
                        : item.freeSpace < 5
                        ? { border: "1px solid yellow" }
                        : {}
                    }
                  >
                    {item.startHours}
                  </p>
                  <button
                    className="training-free-space"
                    style={
                      item.freeSpace < 1
                        ? { border: "1px solid red" }
                        : item.freeSpace < 5
                        ? { border: "1px solid yellow" }
                        : {}
                    }
                    onClick={() => takeSpot(item.id , item.day)}
                  >
                    {item.freeSpace}
                  </button>
                </div>
              </div>
            ))}
          </div>
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
