import { Training } from "../../../types/training.model";

const SingleTraining = ({
  item,
  takeSpot,
}: {
  item: Training;
  takeSpot: (id: string, day: string) => void;
}) => (
  <div className="single-training-wrapper" key={item.id}>
    <div className="single-training">
      <p
        className="training-termin"
        onClick={() => takeSpot(item.id, item.day)}
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
);

export default SingleTraining;
