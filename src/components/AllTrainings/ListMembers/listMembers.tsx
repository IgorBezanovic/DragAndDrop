import { Member } from "../../../types/member.model";

const ListMembers = ({
  member,
  removeMember,
  trainingId,
}: {
  member: Member;
  removeMember: (memberId: string, trainingId: string) => void;
  trainingId: string;
}) => (
  <div className="single-member">
    <p>
      {member.name} {member.lastName}
    </p>
    <button className="submit training-button" onClick={() => removeMember(member.id, trainingId)}>
      Remove Member
    </button>
  </div>
);

export default ListMembers;
