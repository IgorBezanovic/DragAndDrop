import React, { useState } from "react";
import listUsers from "../../service/listUsers";
import { User } from "../../types/user.model";

const Account: React.FC = () => {
  const currentId: string | null = localStorage.getItem("id");
  const [userList, setUser] = useState<User[]>(listUsers.listUsers);
  let user: User | undefined = userList.find((item) => item.id === currentId);

  return (
    <div className="wrapper-account">
      <h1 className="welcome-title">Welcome, {user?.username}</h1>
      {user?.role === "admin" ? (
        <div>
          <p>ja sam admin</p>
        </div>
      ) : (
        <div>
          <p>ja sam user</p>
        </div>
      )}
    </div>
  );
};

export default Account;
