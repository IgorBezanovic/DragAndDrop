import React from "react";
import { Member } from "../../../types/member.model";

const ListMembers = ({
  member,
  removeMember,
  trainingId,
}: {
  member: Member;
  removeMember: (memberId: number, trainingId: number) => void;
  trainingId: number;
}) => (
  <div>
    <p>
      {member.name} {member.lastName}
    </p>
    <button onClick={() => removeMember(member.id, trainingId)}>
      Remove Member
    </button>
  </div>
);

export default ListMembers;
