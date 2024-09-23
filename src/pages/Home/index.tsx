import React from "react";
import { auth } from "../../firebase";

import ChatRoom from "../../components/Chat";

const Prattle = () => {
  const user = auth.currentUser;

  console.log("user", user);

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-center">Prattle</h1>
      <div className="flex justify-center mt-6">
        <ChatRoom />
      </div>
    </div>
  );
};

export default Prattle;
