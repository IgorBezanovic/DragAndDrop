import { User } from "../../../types/user.model";

const ListMembers = ({
  member,
  removeMember,
  trainingId,
}: {
  member: User;
  removeMember: (memberId: string, trainingId: string) => void;
  trainingId: string;
}) => (
  <div className="single-member">
    <p>
      {member.username} {member.password}
    </p>
    <button className="submit training-button" onClick={() => removeMember(member.id, trainingId)}>
      Remove Member
    </button>
  </div>
);

export default ListMembers;
