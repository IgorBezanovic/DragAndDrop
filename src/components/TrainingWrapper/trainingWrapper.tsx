import React from "react";
import { Training } from "../../types/training.model";
import SingleTraining from "./SingleTraining/singleTraining";

const TrainingWrapper = ({
  title,
  list,
  takeSpot,
}: {
  title: string;
  list: Training[];
  takeSpot: (id: number, day: string) => void;
}) => (
  <div className="content-training">
    <p className="content-title">{title}</p>
    <div className="grid-template">
      {list.map((item) => (
        <SingleTraining item={item} key={item.id} takeSpot={takeSpot} />
      ))}
    </div>
  </div>
);

export default TrainingWrapper;
