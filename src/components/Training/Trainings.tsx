import React, { useState } from "react";
import "./style.css";

type Training = {
  id: number;
  day: string;
  startHours: string;
  freeSpace: number;
};

type Days = {
  id: string;
  day: string;
};

const listDays: Days[] = [
  { id: "d1", day: "Today" },
  { id: "d2", day: "Tomorrow" },
];

const listTrainings: Training[] = [
  { id: 1, day: "d1", startHours: "09:00", freeSpace: 12 },
  { id: 2, day: "d1", startHours: "10:00", freeSpace: 12 },
  { id: 3, day: "d1", startHours: "11:00", freeSpace: 12 },
  { id: 4, day: "d1", startHours: "15:00", freeSpace: 16 },
  { id: 5, day: "d1", startHours: "16:00", freeSpace: 16 },
  { id: 6, day: "d1", startHours: "17:00", freeSpace: 16 },
  { id: 7, day: "d1", startHours: "18:00", freeSpace: 16 },
  { id: 8, day: "d1", startHours: "19:00", freeSpace: 16 },
  { id: 9, day: "d2", startHours: "09:00", freeSpace: 12 },
  { id: 10, day: "d2", startHours: "10:00", freeSpace: 12 },
  { id: 11, day: "d2", startHours: "11:00", freeSpace: 12 },
  { id: 12, day: "d2", startHours: "15:00", freeSpace: 16 },
  { id: 13, day: "d2", startHours: "16:00", freeSpace: 16 },
  { id: 14, day: "d2", startHours: "17:00", freeSpace: 16 },
  { id: 15, day: "d2", startHours: "18:00", freeSpace: 16 },
  { id: 16, day: "d2", startHours: "19:00", freeSpace: 16 },
];

const Trainings: React.FC = () => {
  const [isToday, setToday] = useState(true);
  const [isTomorrow, setTomorrow] = useState(false);

  const handleToday = () => {
    setToday(true);
    setTomorrow(false);
  };
  const handleTomorrow = () => {
    setToday(false);
    setTomorrow(true);
  };

  const renderContent = () => {
    if (isToday) {
      const todayTermins = listTrainings.filter((item) => item.day !== "d2");
      return (
        <div>
          Danasnji treninzi
          {todayTermins.map((item) => (
            <div key={item.id}>
              {item.startHours}, {item.freeSpace}
            </div>
          ))}
        </div>
      );
    } else {
      const tomorrowTermins = listTrainings.filter((item) => item.day !== "d1");
      return (
        <div>
          Sutrasnji treninzi
          {tomorrowTermins.map((item) => (
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
