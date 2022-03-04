import React from "react";

const Info: React.FC = () => {
  return (
    <div>
      <h1>Info</h1>
      <form action="/training" method="post" 
              className="form">
          <button type="submit">Connected?</button>
        </form>
    </div>
  );
};

export default Info;
