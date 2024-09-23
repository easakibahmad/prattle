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
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.uid}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
