import React, { useState } from "react";
import { auth } from "../../firebase";

import ChatRoom from "../../components/Chat";
import UserList from "../../components/UserList";
import PrivateChat from "../../components/PrivateChat";

const Prattle = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleUserSelect = (user: { uid: string }) => {
    setSelectedUser(user.uid);
  };
  console.log(auth.currentUser, selectedUser);

  return (
    <div className="bg-white text-black min-h-screen justify-">
      {auth.currentUser ? (
        <>{!selectedUser && <UserList onUserSelect={handleUserSelect} />}</>
      ) : (
        <>
          <PrivateChat otherUserId={selectedUser} />
          {/* <h1 className="text-3xl font-bold text-center">Prattle</h1>
          <div className="flex justify-center mt-6">
            <ChatRoom />
          </div> */}
        </>
      )}
    </div>
  );
};

export default Prattle;
