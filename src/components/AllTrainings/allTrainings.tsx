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
  <div key={training.id}>
    {training.startHours}
    <button onClick={() => addMember(training.id)}>Add Member</button>
    <button onClick={() => removeTraining(training.id)}>Remove training</button>
    {training.members.map((member) => (
      <ListMembers
        key={member.id}
        member={member}
        trainingId={training.id}
        removeMember={removeMember}
      />
    ))}
  </div>
);

export default AllTrainings;
