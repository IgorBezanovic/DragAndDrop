import { Training } from "../../types/training.model";
import ListMembers from "./ListMembers/listMembers";

const AllTrainings = ({
  training,
  removeTraining,
  addMember,
  removeMember,
}: {
  training: Training;
  addMember: (id: string) => void;
  removeTraining: (id: string) => void;
  removeMember: (memberId: string, trainingId: string) => void;
}) => (
  <div key={training.id} className="training-info">
    <div className="training-info-buttons">
      <p className="start-hours">
        {training.extraTermin
          ? ` ${
              training.day === "d1" ? "Today" : "Tomorrow"
            } extra appointment: ${training.startHours}`
          : `${training.day === "d1" ? "Today" : "Tomorrow"} in ${
              training.startHours
            } `}
      </p>
      <button
        className="submit training-button green"
        onClick={() => addMember(training.id)}
      >
        Add Member
      </button>
      <button
        className="submit training-button"
        onClick={() => removeTraining(training.id)}
      >
        Remove training
      </button>
    </div>
    <div>
      {training.members.map((member) => (
        <ListMembers
          key={member.id}
          member={member}
          trainingId={training.id}
          removeMember={removeMember}
        />
      ))}
    </div>
  </div>
);

export default AllTrainings;
