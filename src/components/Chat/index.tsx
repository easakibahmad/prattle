import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../firebase";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

interface Message {
  id: string;
  text: string;
  uid: string;
  createdAt: any;
}

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const user = auth.currentUser;

  useEffect(() => {
    const messagesQuery = query(
      collection(firestore, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Message)
      );
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(firestore, "messages"), {
        text: newMessage,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });
      setNewMessage("");
    } else {
      console.error("User not logged in. Cannot send message.");
    }
  };

  return (
    <div>
      <div className="messages mb-6">
        {messages.map((msg) => (
          <div className="bg-white text-black p-2 my-2 rounded-xl" key={msg.id}>
            <strong className="mr-2">{user?.email}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
