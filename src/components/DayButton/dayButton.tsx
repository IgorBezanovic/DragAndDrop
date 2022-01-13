import { Days } from "../../types/days.model";

const DayButton = ({
  item,
  isToday,
  isTomorrow,
  handleToday,
  handleTomorrow,
}: {
  item: Days;
  isToday: boolean;
  isTomorrow: boolean;
  handleToday: () => void;
  handleTomorrow: () => void;
}) => (
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
    onClick={item.id === "d1" ? handleToday : handleTomorrow}
  >
    {item.day}
  </button>
);

export default DayButton;
