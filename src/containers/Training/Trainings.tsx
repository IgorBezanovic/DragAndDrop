import React, { useState } from "react";
import "./style.css";
import { Training } from "../../types/training.model";
import { listDays } from "../../service/listDays";
import listTrainings from "../../service/listTrenings";
import DayButton from "../../components/DayButton/dayButton";
import TrainingWrapper from "../../components/TrainingWrapper/trainingWrapper";
import Popup from "../../common/Dialog/dialog";
import { User } from "../../types/user.model";
import listUsers from "../../service/listUsers";
import {
  ALREADY_SCHEDULED,
  MEMBERSHIP_FEE,
  SCHEDULING_TRAINING,
  SEATS_FILLED,
  SUCCESSFULLY_SCHEDULED_TRAINING,
  TODAY_TRAININGS,
  TOMORROW_TRAININGS,
} from "../../common/constants";

const Trainings: React.FC = () => {
  const [isToday, setToday] = useState<boolean>(true);
  const [isTomorrow, setTomorrow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupTitle, setTitle] = useState<string>("");
  const [popupContent, setContent] = useState<string>("");
  const currentId: string = localStorage.getItem("id")!;
  const userList = listUsers.listUsers;
  let user: User | undefined = userList.find((item) => item.id === currentId);

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
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const popupLogic = (title: string, content: string) => {
    togglePopup();
    setTitle(title);
    setContent(content);
    setTimeout(() => setIsOpen(false), 3000);
  };

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
        training.members.find((member) => member.id === user?.id)
    );

    let freeSpaceIndex = listTrainings.listTrainings.findIndex(
      (item) => item.id === id
    );

    if (listTrainings.listTrainings[freeSpaceIndex].freeSpace) {
      if (!alreadyReserved.length) {
        if (user?.numTrainings !== 0) {
          listTrainings.addMember(id, user!);
          let newList = [...listTrainings.listTrainings];
          if (day === "d1") {
            setTodayTraining(newList.filter((item) => item.day === day));
          } else {
            setTomorrowTraining(newList.filter((list) => list.day === day));
          }
          popupLogic(SCHEDULING_TRAINING, SUCCESSFULLY_SCHEDULED_TRAINING);
        } else {
          popupLogic(SCHEDULING_TRAINING, MEMBERSHIP_FEE);
        }
      } else {
        popupLogic(SCHEDULING_TRAINING, ALREADY_SCHEDULED);
      }
    } else {
      popupLogic(SCHEDULING_TRAINING, SEATS_FILLED);
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
          title={isToday ? TODAY_TRAININGS : TOMORROW_TRAININGS}
          list={isToday ? todayTrainingsList : tomorrowTrainingsList}
          takeSpot={takeSpot}
        />
      </div>
        <Popup
          title={popupTitle}
          content={popupContent}
          handleClose={togglePopup}
          open={isOpen}
          addFunction={togglePopup}
        > </Popup>
    </div>
  );
};

export default Trainings;
