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
      <p>Broj preostalih treninga je: {user?.numTrainings}</p>
      {user?.role === "admin" ? (
        <div>
          <p>tito</p>
        </div>
      ) : (
        <div>
          <h2>To do:</h2>
          <p>dodavanje usera-a</p>
          <p>brisanje user-a</p>
          <p>promena passworda </p>
          <p>u class-i user dodati lastName i password odvojeno - DONE</p>
        </div>
      )}
    </div>
  );
};

export default Account;
