import React, { useState } from "react";
import "./style.css";
import { Training } from "../../types/training.model";
import { listDays } from "../../service/listDays";
import listTrainings from "../../service/listTrenings";
import DayButton from "../../components/DayButton/dayButton";
import TrainingWrapper from "../../components/TrainingWrapper/trainingWrapper";
import Popup from "../../common/Popup/popup";
import { User } from "../../types/user.model";
import listUsers from "../../service/listUsers";

const Trainings: React.FC = () => {
  const [isToday, setToday] = useState<boolean>(true);
  const [isTomorrow, setTomorrow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupTitle, setTitle] = useState<string>("");
  const [popupContent, setContent] = useState<string>("");
  const todayTrainingButton: string = "Danasnji treninzi";
  const tomorrowTrainingButton: string = "Sutrasnji treninzi";
  const currentId: string | null = localStorage.getItem("id");
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
          popupLogic(
            "Zakazivanje treninga",
            "Uspešno ste zakazali trening! :)"
          );
        } else {
          popupLogic(
            "Zakazivanje treninga",
            "Nemate treninga na raspolaganju. Molimo uplatite clanarinu."
          );
        }
      } else {
        popupLogic(
          "Zakazivanje treninga",
          "Vec ste zakazali trening u ovom terminu :)"
        );
      }
    } else {
      popupLogic(
        "Zakazivanje treninga",
        "Sva mesta su popunjana, odaberite neki drugi termin koji Vam odgovara."
      );
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
          title={isToday ? todayTrainingButton : tomorrowTrainingButton}
          list={isToday ? todayTrainingsList : tomorrowTrainingsList}
          takeSpot={takeSpot}
        />
      </div>
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

export default Trainings;
